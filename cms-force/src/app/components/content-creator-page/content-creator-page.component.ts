import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-creator-page',
  templateUrl: './content-creator-page.component.html',
  styleUrls: ['./content-creator-page.component.css']
})
export class ContentCreatorPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

//   //Initialize with the list of symbols
// let names = ["BTC","XRP","ETH","BCH","ADA","XEM","LTC","XLM","TRX","MIOTA","DASH","EOS","XMR","NEO","QTUM","BTG","ETC","ICX","LSK","XRB","OMG","SC","BCN","ZEC","XVG","BCC","DCN","BTS","PPT","DOGE","BNB","KCS","STRAT","ARDR","SNT","STEEM","USDT","WAVES","VEN","DGB","KMD","DRGN","HSR","KIN","ETN","GNT","REP","VERI","ETHOS","RDD","ARK","XP","FUN","KNC","BAT","DCR","SALT","DENT","ZRX","PIVX","QASH","NXS","ELF","AE","FCT","POWR","REQ","AION","SUB","BTM","WAX","XDN","NXT","QSP","MAID","RHOC","GAS","LINK","GBYTE","MONA","SAN","ENG","ICN","BTCD","SYS","XZC","VEE","POE","TNB","PAY","DGD","WTC","PAC","ZCL","GNO","LEND","CVC","RDN","BNT","NEBL","GXS","ACT","DBC","ENJ","STORM","STORJ","GAME","VTC","COB","UKG","SKY","CND","SMART","NAV","CNX","XBY","MED","CMT","RPX","PLR","CTR","BAY","BLOCK","ANT","R","UBQ","SNM","MCO","AST","MANA","SNGLS","ITC","RCN","FLASH","AMB","DATA","EDG","ATM","XPA","DNT","RLC","PART","ADX","ST","TRIG","EMC2","WABI","BRD","ETP","BURST","XSH","DTR","BCO","WINGS","FUEL","ZEN","NULS","EMC","MOON","PPP","MGO","XCP","SRN","1ST","TNT","PPC","MOD","LBC","THC","LA","DCT","MLN","UTK","SPANK","RISE","CLOAK","XAS","EDO","CDT","DPY","QRL","WGR","MTL","GTO","AGRS","GVT","PRL","VIA","ADT","GRS","COSS","AEON","GRID","YOYOW","SHIFT","HST","VOX","MTH","INK","FTC","XSPEC","NYC","NLG","CFI","PRE","TRST","VIB","LUN","BNTY","SLS","GUP","EVX","SNOV","DLT","UNITY","JINN","MER","ECN","PURA","MINT","NLC2","POT","ZSC","TKN","HMQ","NMC","WRC","VIBE","AMP","DIME","PEPECASH","BITCNY","RVT","PPY","PASC","DAT","PRO","TIX","ION","BCPT","BLK","TAAS","COLX","NET","DMD","IOC","AIR","MDA","PAYX","MNX","STX","BITB","SIB","IXT","XEL","NMR","LRC","DRT","GRC","LMC","CRW","ELIX","HEAT","MSP","EXP","FAIR","XMY","SLR","OMNI","NEU","GOLOS","MUE","BTX","PHR","FLIXX","ONION","DIVX","HVN","PBL","OAX","XWC","MUSIC","ECC","BOT","ATB","DOVU","EAC","ARN","PKT","NEOS","ART","KICK","LKK","XRL","RADS","VRC","OK","VOISE","CREDO","POLL","SPRTS","TIPS","LINDA","PST","FLDC","NSR","PLBT","LOC","RBY","NXC","DBET","ZOI","HUSH","TGT","CAG","SBD","ALIS","PTOY","ECOB","XLR","COVAL","MYST","SWT","BIS","AVT","SNC","GCR","GAM","PINK","PRG","XNN","BLUE","QAU","BCAP","IFT","INCNT","POSW","FLO","IOP","XST","DNA","DTB","TIME","GEO","BMC","ORME","PIX","OTN","MYB","SPF","QWARK","OCT","ENRG","CRED","CLAM","ESP","CARBON","HDG","NIO","GMT","WILD","SOAR","WCT","PND","CAT","STAK","ODN","RMC","ABY","CURE","ICOS","BSD","BITUSD","OBITS","BBR","FRST","XPM","BET","XVC","SEQ","BCY","TX","DOPE","CSNO","CANN","XMCC","SUMO","WISH","OXY","SPR","BTM","TFL","BQ","DICE","LEO","OPT","UNO","NVST","SPHR","SNRG","XUC","PRIX","DBIX","PFR","PLU","NTRN","ATMS","SSS","SYNX","ALQO","PTC","BWK","1337","HYP","2GIVE","ETT","SEND","UFR","ZNY","RUP","MEME","DOT","DRP","GLD","REAL","GBX","BELA","TCC","VSX","CRC","BRX","VRM","CRB","SXC","LUX","ITNS","XAUR","AUR","UNIT","QRK","INXT","UFO","B2B","IXC","AC","START","KORE","BRK","BTDX","SCL","XBC","PIRL","IND","TZC","RIC","ARC","BUZZ","QVT","ZEIT","NVC","INN","BDL","HBT","HGT","HWC","REX","NOTE","EXCL","BLITZ","PURE","NOBL","MTNC","VIVO","FYP","BBT","CHC","XTO","ERO","APX","EDR","USNBT","VSL","CRAVE","EBST","ASTRO","TOA","FOR","ADST","CHIPS","VTR","BTCZ","BPL","ERC","808","PZM","PDC","TRUST","XMG","ZEPH","DYN","LIFE","PUT","BON","ADC","BUN","XCN","UNIFY","SMART","TRC","CREA","MAG","EGC","CVCOIN","EQT","WDC","ANC","GOOD","HOLD","FRD","ATS","B3","ELTCOIN","LDOGE","HUC","TKS","DGPT","FJC","SWIFT","ATL","XFT","REC","ONG","XGOX","PKB","MXT","ELLA","CFT","KRB","AHT","MBRS","DNR","PING","RKC","RNS","DCY","EBTC","YOC","GIM","MZC","MCAP","ZRC","BLU","ETBS","EFL","FST","NET","FLT","CTX","ARC","GCC","XCPO","CBX","TTC","MOIN","PBT","HAT","GUN","BASH","NKA","IFLT","LINX","EBET","FLIK","DP","EPY","BLAS","DFT","MEC","ENT","SMC","OCL","RAIN","STA","KLN","GRE","V","UIS","ALT","EFYT","GRWI","XLC","FYN","STU","CMPCO","DAXX","CFD","DAR","MRT","UNB","OTX","LANA","KEK","PIPL","ZET","ZER","BYC","NDC","LGD","TRUMP","BTA","ADL","XPTX","INFX","ERC20","KURT","NUKO","DGC","FCN","BRO","INSN","XPD","VISIO","TRCT","FC2","CDN","ABJ","SGR","BBP","ZENI","HTC","DAI","WHL","RC","STRC","Q2C","TRI","ATOM","I0C","SIFT","SMLY","TES","MAC","ZCG","NETKO","KLC","ADZ","PROC","ICOO","DSR","TIT","XBL","CRM","LOG","ELE","PIGGY","SAGA","UTC","EMV","MNE","JNS","MCRN","CCT","CJ","ACC","CPC","TOKEN","WGO","XIOS","NYAN","BTCS","PASL","SIGT","MNC","AU","SKIN","TROLL","BITS","CNT","XCXT","GB","FUCK","HBN","8BIT","YTN","ROC","42","MAX","B@","USC","SOON","SDRN","BTB","BPC","KOBO","RIYA","HODL","ORB","NTO","CCN","TRK","PXC","HPC","DEM","DIX","CNO","VIDZ","GAIA","DSH","RBT","ONX","OPAL","BRIT","CV2","HAL","RED","4CHN","C2","TKR","BUCKS","XPY","DRXNE","XHI","POS","ARI","TRDT","LBTC","SDC","BTCRED","CORG","WTT","TAG","ETG","ALTCOM","XJO","EVIL","KUSH","XRA","PCOIN","VOT","BCF","DDF","FNC","AMMO","BOLI","PAK","CCO","MARS","VLT","RLT","BIGUP","SPACE","MONK","CUBE","XCT","EGAS","PR","SUPER","RBX","UNY","TEK","LCP","EMD","GAP","BLC","ITI","NTWK","UNIC","JET","CCRB","GRIM","TSE","LTB","CAT","EOT","ICOB","CHESS","BTSR","COAL","MAD","888","AMS","KRONE","POST","MOJO","XGR","VAL","BITBTC","KAYI","WYV","ZZC","BSTY","DFS","MNM","PXI","EL","SLG","BERN","BTWTY","HERO","EBCH","CRX","DALC","QTL","SWING","STV","EUC","KED","TGC","VUC","MAR","ECASH","STARS","ERY","ZUR","ETHD","CMT","BAS","EREAL","SOIL","HNC","BRAT","GTC","IMS","CNNC","SHDW","BNX","ARG","SRC","GLT","BTG","PX","XVP","NRO","MAO","IETH","MOTO","XRE","MTLMC3","ICN","UNITS","HONEY","AERM","PHS","EVO","CACH","FUNC","SPEX","CON","HXX","HMP","XCO","EAGLE","611","ECO","DUO","GP","FLAX","XCRE","REE","ZMC","BITSILVER","CPN","SCORE","GPU","ACOIN","USDE","BUMBA","CXT","XCS","$$$","ARCO","RPC","MST","SPT","BLN","FIRE","JIN","SFC","BIP","TAJ","QCN","GPL","XBTS","RBIES","NEVA","RUPX","BOAT","VPRC","BENJI","MAY","SONG","OFF","ALL","CWXT","E4ROW","300","ASAFE2","BTPL","FUZZ","BSTAR","IMX","MSCN","LUNA","ICON","CTO","WBB","PLACO","COXST","SLEVIN","CTIC3","UET","CF","DRS","EXN","PEX","ARGUS","TYCHO","PIE","BITEUR","URC","PRX","PRC","PLNC","DOLLAR","BTQ","ROOFS","WOMEN","ATX","BRAIN","SOCC","GEERT","XBTC21","QBC","ZYD","LTCU","RIDE","VLTC","MILO","VIP","DIBC","LTCR","ACP","FXE","CRDNC","VRS","ELS","JS","AGLC","KNC","LIR","ZNE","LVPS","JOBS","HVCO","CTIC2","SANDG","XRC","CRTM","MGM","IBANK","NODC","P7C","VOLT","CREVA","TSTR","SLFI","NANOX","GSR","XNG","HMC","EBT","DGCS","DMB","ABN","ECA","PHO","GCN","VTA","PGL","RUSTBITS","YASH","INPAY","FIMK","ITT","CRYPT","FUNK","SHORTY","BLOCKPAY","POP","CASINO","LNK","LOT","MBI","METAL","ITZ","BXT","STS","AMBER","MRJA","BTCR","UNI","WAY","BRIA","SCRT","BLZ","GLC","GRT","BITZ","NEWB","AIB","MUT","SH","J","FRC","ISL","FLY","SLING","CYP","RMC","TALK","ICE","FRK","MEOW","WMC","SAC","VC","BITGOLD","YAC","ANTI","WORM","LEA","DLC","BOST","VEC2","WARP","GCC","URO","DES","FLVR","QBK","DBTC","BVC","MND","DRM","STEPS","BLRY","JWL","TOR","GBT","ARB","PULSE","ADCN","RSGP","G3N","EGO","BIOS","CASH","MRNG","MTM","IMPS","ORLY","BSC","DLISK","SCS","CRT","OS76","PONZI","CESC","XOC","TAGR","ALTC","CAB","SDP","BIOB","FRAZ","GBC","CCM100","LEX","CONX","SOJ","ULA","PIZZA","OCEAN","CALC","APW","ATMC","NAS","GNX","SMT","BIX","GTC","BCD","MOT","QLC","SPHTX","TSL","HTML","AMM","CAT","QBT","PRO","HPY","ACE","BCX","INF","CAPP","NGC","SHND","SBTC","ENT","MKR","DIM","B2X","FRGC","LLT","CMS","VIU","DEW","WC","UGT","XTZ","MDS","CLUB","IRL","AI","CMS","BIG","HBC","HTML5","FIL","IGNIS","EAG","GBG","BTCA","XID","ESC","BCDN","PAYP","TOK","IFC","LBTC","UQC","VASH","KBR","BSR","BTE","EXRN","XIN","GRX","UBTC","CPAY","MAGE","PLAY","KARMA","MAGN","SAFEX","ANI","SFE","QBT","FDX","SBC","ZENGOLD","TIE","GBRC","GAIN","STAR","PEC","BEST","MGC","TER","DAV","PCN","PYLNT","SHA","NEOG","PLC","ACES","WAND","SISA","MARX","SUR","MONEY","COUPE","FLAP","SIGMA","TOP","BOS","SJCX","DMC","TURBO","MSD","MINEX","ETT","MTX","CYC","VULC","ACC","THS","GAY","WIC","XSTC","LTG","BTCS","SCT","FONZ","BT1","SKR","WOW","ZBC","FAZZ","UR","DON","DAY","TRIA","HDLB","WINK","BT2","CMP","IQT","SAK","BITOK","FUDD","PLX","PRN","PNX","BTCM","MCI","EUSD","FRN","EDRC","ELITE","EVC","UAHPAY","RYZ","SKC","DUTCH","EVR","XTD","NTC","TELL","HIGH","WSX","YES","ZSE","FFC","LEPEN","RCN","HALLO","BXC","INDIA","EGOLD","COR","BLX","ASN","PRES","NAMO","UNRC","OX","GOLF","FID","APC","CYDER","GLS","GRN","RUNNERS","REGA","BTC2X","BTBc","ANTX","SND","PCS","UNC","TODAY","GMX","ABC","CHEAP","DISK","WA","PRIMU","MCR","X2","ELC","PDG","HYTV","BSN","ACN","POKE","AKY","DEUS","CASH","LAZ","SKULL","RUPX","CC","HNC","MONETA","ROYAL","QORA","MAVRO","BIRDS","FAP","TCOIN","EBIT","KASHH","LDCN","XOT","CME","BLAZR","GARY","IBTC","LKC","NBIT","SPORT","DBG","STEX","YEL","BUB","IPY","TEAM","AXIOM","PRM","ELTC2","BITCF","GML","SNAKE","UTA","9COIN","HYPER","AV","XVE","10MT","FUTC","XQN","LTH","RUBIT","BIT","TLE","SHELL","XDE2","FBL","CBD","FRWC","DASHS","DUB","MMXVI","OMC","FC","PSY","OP","TOPAZ","RICHX","SWP","TCR","HCC","TRICK","BAC","IVZ","XAU","MEN","OPES","XID","VOYA","MBL","BET","BAT","RBBT","BGR","EGG","DCRE","TESLA","TERA","RHFC","GUC","ADK","XRY","EMB","CSC","OCOW","BTU","XYLO","STC","QC","FRCT","MDC"]

// //Find the input search box
// let search = document.getElementById("searchCoin")

// //Find every item inside the dropdown
// let items = document.getElementsByClassName("dropdown-item")
// function buildDropDown(values) {
//     let contents = []
//     for (let name of values) {
//     contents.push('<input type="button" class="dropdown-item" type="button" value="' + name + '"/>')
//     }
//     $('#menuItems').append(contents.join(""))

//     //Hide the row that shows no items were found
//     $('#empty').hide()
// }

// //Capture the event when user types into the search box
// window.addEventListener('input', function () {
//     filter(search.value.trim().toLowerCase())
// })

// //For every word entered by the user, check if the symbol starts with that word
// //If it does show the symbol, else hide it
// function filter(word) {
//     let length = items.length
//     let collection = []
//     let hidden = 0
//     for (let i = 0; i < length; i++) {
//     if (items[i].value.toLowerCase().startsWith(word)) {
//         $(items[i]).show()
//     }
//     else {
//         $(items[i]).hide()
//         hidden++
//     }
//     }

//     //If all items are hidden, show the empty view
//     if (hidden === length) {
//     $('#empty').show()
//     }
//     else {
//     $('#empty').hide()
//     }
// }

// //If the user clicks on any item, set the title of the button as the text of the item
// $('#menuItems').on('click', '.dropdown-item', function(){
//     $('#dropdown_coins').text($(this)[0].value)
//     $("#dropdown_coins").dropdown('toggle');
// })

// buildDropDown(names)

}
