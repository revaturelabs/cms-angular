import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Content } from 'src/app/models/Content';
import { ContentFetcherService } from 'src/app/services/content-fetcher.service';
import { Link } from 'src/app/models/Link';
import { ModuleStoreService } from 'src/app/services/module-store.service';
import { ToastrService } from 'ngx-toastr';
import { ITreeOptions, TreeComponent, IActionMapping, TREE_ACTIONS, TreeModel, TreeNode, ITreeState } from 'angular-tree-component';
import { IStorageStrategy } from 'ngx-cacheable';
import { Module } from 'src/app/models/Module';

/** Typescript component for the Content Creator page */
@Component({
   selector: 'app-content-creator-page',
   templateUrl: './content-creator-page.component.html',
   styleUrls: ['./content-creator-page.component.css']
})
export class ContentCreatorPageComponent implements OnInit {


   /** Each format string automatically generates button */
   readonly formats: string[] = ["Code", "Document", "Powerpoint"];

   /** Title of content */
   title: string;

   /** Url of content */
   url: string;

   /** Used for radio selection for content (Ex. Powerpoint, code, etc) */
   selFormat: string = "Code";

   /** Description of content */
   description: string;

   test: string;
   listURLS = ['http://example.com'];
   urlFlag = '';
   /** Description - boolean to display a spinner for submitting in progress */
   isSubmitting: boolean = false;

   /** Stores selected subjects */
   selectedSubjects: number[] = [];

   // Called in nodeCreation() for tree nodes
   nodes: any[] = this.ms.nodes;
   tempChildren: Module[] = [];

   state: ITreeState = {
      activeNodeIds: {}
   };

   /**
    *  Content creater constructor 
    * @param cs Content Fetcher
    * @param ms Module Store
    */
   constructor(
      private cs: ContentFetcherService,
      public ms: ModuleStoreService,
      private toastr: ToastrService
   ) {

   }

   /** On page initialization load the modules to list on the dropdown menu */
   ngOnInit() {
      this.ms.loadModules();
      this.getListOfURLS();
      this.tree.treeModel.update();

   }

   ngDoCheck() {
      if (this.nodes.length == 0) {
         this.nodes = this.ms.nodes;
         this.tree.treeModel.update();

      }
   }

   ngAfterViewInit() {
      this.tree.treeModel.update();
      this.tree.sizeChanged();
   }

   /** On page initialization load the modules to list on the dropdown menu */
   getListOfURLS() {
      let handle = this;
      handle.cs.getAllContent().subscribe(
         data => data.forEach(
            function (item) {

               handle.listURLS.push(item.url);



            })
      );
   }

   /** Check if the input fields are all valid - i.e. all fields are filled in */
   validInput(): boolean {
      let cantBeNull = [this.title, this.selFormat, this.url];

      if (cantBeNull.includes(null) || cantBeNull.includes(undefined)) return false;
      return true;
   }

   /**
    * Submit the content object which has the input fields and the list of tags as link array
    * where the link has its subject id populated and the rest are set to default values
    */
   submit() {
      console.log(this.tree.treeModel.activeNodeIds);
      this.isSubmitting = true;

      if (this.listURLS.indexOf(this.url) >= 0) {

         this.toastr.error('The URL already exsists in database.');
         this.isSubmitting = false;
         return;
      }


      //if the input was not valid display a toastr message and return
      if (!this.validInput()) {
         this.toastr.error('Please fill in all input fields!');
         this.isSubmitting = false;
         return;

         //if the url was not a valid url display a toaster message and return
      } else if (!this.validURL(this.url)) {
         this.toastr.error('Invalid URL. e.g. "http://example.com", "ftp://www.example.com", "http://192.168.0.0"');
         this.isSubmitting = false;
         return;
      }

      //If the input was valid continue
      let save_url = this.url;
      //create a content object with the data inputed by the user
      let content: Content = new Content(
         null, this.title, this.selFormat,
         this.description, this.url,
         this.getLinksFromSubjects(Object.entries(this.tree.treeModel.activeNodeIds)));

      
      //call the ContentFetcherService to create a new content
      this.cs.createNewContent(content).subscribe(
         (response) => {
            if (response != null) {

               //on success, display a toastr message and reset the variables on this page
               this.toastr.success('Successfully sent content.');
               this.resetVariables();
               this.listURLS.push(save_url); //
            } else {
               this.toastr.error('Response was null.');
               this.isSubmitting = false;
            }
         },
         (response) => {
            this.toastr.error('Failed to send content.');
            this.isSubmitting = false;
         }
      )

      this.tree.treeModel.setState(this.state);
      this.tree.treeModel.update();
   }

   /** Clears the input fields after successful content submit */
   resetVariables() {
      this.title = null;
      this.url = null;
      this.selFormat = "Code";
      this.description = null;
      this.selectedSubjects = [];
      this.isSubmitting = false;
   }


   /**
    * Creates a new set of links from selected subject names
    * 
    * @param {number[]} subjects List/array of selected subjects subjects
    * @returns A new set of links.
    */
   getLinksFromSubjects(subjects: any): Link[] {
      let links = [];
      subjects.forEach(
         (subject) => {
            if(subject[1]) {
               links.push(new Link(null, null, subject[0], null));
            }
         }, this
      )
      return links;
   }

   /**
    * Takes in the url to check if it matches the application protocol such as http
    * See "Url Regex Filter" for more information on this implementation
    * 
    * @param {string} url Url of content
    * @returns True if url is valid, false if not valid.
    */
   validURL(url: string): boolean {
      let regexp: RegExp = /^((http[s]?|ftp):\/\/)(((\w+\.)?\w+\.\w{2,})|(\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}))(\/[\w-._~:/?#[\]@!$&'()*+,;=]+(\.[\w-._~:/?#[\]@!$&'()*+,;=]+)?)*(\?|\?[\w-._~:/?#[\]@!$&'()*+,;=]+=[\w-._~:/?#[\]@!$&'()*+,;=]*(&[\w-._~:/?#[\]@!$&'()*+,;=]+=[\w-._~:/?#[\]@!$&'()*+,;=]*)*)?(#[\w-._~:/?#[\]@!$&'()*+,;=]*)?\/?$/;
      return regexp.test(url);
   }

   // Creates the view for the tree component
   @ViewChild(TreeComponent, null)
   public tree: TreeComponent;

   // custom options for ITree that allows for nodes to be formatted like module
   options: ITreeOptions = {
      displayField: 'subject',
      childrenField: 'childrenModulesObject',
      actionMapping,
      idField: 'id'
   }
}
// Allows for mutliselect within ngTree
const actionMapping: IActionMapping = {
   mouse: {
      click: TREE_ACTIONS.TOGGLE_ACTIVE_MULTI
   }
}
