(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["qywxPage-view-qywxClient-updateKeHu"],{2014:function(e,a,t){"use strict";t.d(a,"b",(function(){return n})),t.d(a,"c",(function(){return i})),t.d(a,"a",(function(){return l}));var l={uInput:t("a798").default,uIcon:t("5ce6").default,uButton:t("b9f7").default},n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("v-uni-view",[t("v-uni-view",{staticClass:"btName"},[e._v("基础信息")]),t("v-uni-view",{staticClass:"flex-white-plr26 ptb10 bdb_f5"},[t("v-uni-text",{staticClass:"mr26"},[t("v-uni-text",[e._v("客户名称")]),t("v-uni-text",{staticClass:"redXingh"},[e._v("*")])],1),t("u-input",{attrs:{placeholder:"请输入客户名称"},model:{value:e.remark,callback:function(a){e.remark=a},expression:"remark"}})],1),0==e.phones.length?t("v-uni-view",[t("v-uni-view",{staticClass:"flex-white-plr26 ptb20 bdb_f5"},[t("v-uni-text",{staticClass:"mr26"},[e._v("联系方式")]),t("v-uni-text",{staticStyle:{color:"#007aff"},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.addPhonesFun.apply(void 0,arguments)}}},[e._v("添加联系方式"),t("u-icon",{attrs:{name:"plus",color:"#007aff",size:"28"}})],1)],1)],1):t("v-uni-view",e._l(e.phones,(function(a,l){return t("v-uni-view",{staticClass:"flex-white-plr26 ptb10 bdb_f5"},[t("v-uni-text",{staticClass:"mr26"},[e._v("联系方式"+e._s(l+1))]),t("u-input",{attrs:{placeholder:"请输入联系方式"},model:{value:a.text,callback:function(t){e.$set(a,"text",t)},expression:"item.text"}}),l==e.phones.length-1?t("u-icon",{attrs:{name:"plus-circle-fill",color:"#007aff",size:"50"},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.addPhonesItemFun.apply(void 0,arguments)}}}):t("u-icon",{attrs:{name:"minus-circle-fill",color:"#f00",size:"50"},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.deletePhonesItemFun(l)}}})],1)})),1),t("v-uni-view",{staticClass:"flex-white-plr26 ptb10 bdb_f5"},[t("v-uni-text",{staticClass:"mr26"},[e._v("所属公司")]),t("u-input",{attrs:{placeholder:"请输入"},model:{value:e.remark_company,callback:function(a){e.remark_company=a},expression:"remark_company"}})],1),t("v-uni-view",{staticClass:"flex-white-plr26 ptb20 mt32"},[t("u-input",{attrs:{placeholder:"企微备注",maxlength:"500",placeholderStyle:"color: #303133;",type:"textarea"},model:{value:e.description,callback:function(a){e.description=a},expression:"description"}})],1),t("v-uni-view",{staticClass:"submitView"},[t("u-button",{staticClass:"submitBtn",attrs:{type:"primary",ripple:!0,"ripple-bg-color":"#909399"},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.submitBtn.apply(void 0,arguments)}}},[e._v("保存")])],1)],1)},i=[]},"310ae":function(e,a,t){var l=t("c86c");a=l(!1),a.push([e.i,"uni-page-body[data-v-57737253]{background-color:#f8f8f8;padding-bottom:%?260?%}body.?%PAGE?%[data-v-57737253]{background-color:#f8f8f8}.u-radio[data-v-57737253]{width:%?200?%!important}",""]),e.exports=a},"3b74":function(e,a,t){"use strict";var l=t("3e27"),n=t.n(l);n.a},"3e27":function(e,a,t){var l=t("310ae");l.__esModule&&(l=l.default),"string"===typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);var n=t("967d").default;n("6c6711d2",l,!0,{sourceMap:!1,shadowMode:!1})},"50fd":function(e,a,t){"use strict";t.r(a);var l=t("2014"),n=t("9272");for(var i in n)["default"].indexOf(i)<0&&function(e){t.d(a,e,(function(){return n[e]}))}(i);t("3b74");var r=t("828b"),u=Object(r["a"])(n["default"],l["b"],l["c"],!1,null,"57737253",null,!1,l["a"],void 0);a["default"]=u.exports},9272:function(e,a,t){"use strict";t.r(a);var l=t("adc9"),n=t.n(l);for(var i in l)["default"].indexOf(i)<0&&function(e){t.d(a,e,(function(){return l[e]}))}(i);a["default"]=n.a},adc9:function(e,a,t){"use strict";t("6a54"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,t("aa9c"),t("01a2"),t("e39c"),t("dc69"),t("dd2b");t("429e");var l=t("d39c"),n="",i={data:function(){return{remark:"",remark_company:"",remark_mobiles:[],description:"",xgInfoObj:{},phones:[]}},onLoad:function(e){n=this,n.setDataFun()},methods:{radioGroupChange:function(e){n.gender=e},pickerSelectFun:function(e){"客户状态"==e?n.selectList=[{value:0,label:"潜在客户"},{value:1,label:"初步接触"},{value:2,label:"持续跟进"},{value:3,label:"成交客户"},{value:4,label:"忠诚客户"},{value:5,label:"无效客户"}]:"客户阶段"==e?n.selectList=[{value:0,label:"初步接洽"},{value:1,label:"确认需求"},{value:2,label:"解决方案"},{value:3,label:"商务谈判"},{value:4,label:"成交"},{value:5,label:"流失"}]:"客户类型"==e?n.selectList=[{value:0,label:"最终客户"},{value:1,label:"渠道客户"},{value:2,label:"竞争对手"}]:"客户性质"==e?n.selectList=[{value:0,label:"企业客户"},{value:1,label:"个人客户"},{value:2,label:"政府单位"},{value:3,label:"事业单位"}]:"客户分级"==e?n.selectList=[{value:0,label:"大型"},{value:1,label:"中型"},{value:2,label:"小型"},{value:3,label:"微型"}]:"客户行业"==e?n.selectList=[{value:0,label:"金融"},{value:1,label:"电信"},{value:2,label:"教育"},{value:3,label:"高科技"},{value:4,label:"政府"},{value:5,label:"制造业"},{value:6,label:"服务业"},{value:7,label:"能源"},{value:8,label:"零售"},{value:9,label:"媒体"},{value:10,label:"娱乐"},{value:11,label:"咨询"},{value:12,label:"非盈利事业"},{value:13,label:"公用事业"},{value:14,label:"其他"}]:"客户来源"==e&&(n.selectList=[{value:0,label:"电话咨询"},{value:1,label:"自主开拓"},{value:2,label:"公司资源"},{value:3,label:"网络推广"},{value:4,label:"渠道代理"},{value:5,label:"其他方式"}]),n.selectShow=!0,n.selectType=e},selectConfirmFun:function(e){var a=e[0].label;"客户状态"==n.selectType?n.companyState=a:"客户阶段"==n.selectType?n.jieDuan=a:"客户类型"==n.selectType?n.type=a:"客户性质"==n.selectType?n.xingZhi=a:"客户分级"==n.selectType?n.fenJi=a:"客户行业"==n.selectType?n.hangYe=a:"客户来源"==n.selectType&&(n.laiYuan=a)},pickerShowFun:function(e){"生日"==e?(n.pickerMode="time",n.pickerParams={year:!0,month:!0,day:!0}):"地区"==e?(n.pickerMode="region",n.pickerParams={province:!0,city:!0,area:!0}):"客户阶段"==e&&(n.pickerMode="selector"),n.pickerShow=!0},pickerConfirmFun:function(e){"time"==n.pickerMode?n.birthday=e.year+"-"+e.month+"-"+e.day:(n.province=e.province.label,n.city=e.city.label,n.area=e.area.label,n.region=n.province+" "+n.city+" "+n.area)},chooseAddrFun:function(){uni.chooseLocation({success:function(e){n.address=e.address,n.latitude=e.latitude,n.longitude=e.longitude}})},submitBtn:function(){for(var e=n.phones,a=[],t=0;t<e.length;t++)a.push(e[t].text);n.remark_mobiles=a;var i={req:{remark_company:n.remark_company,remark_mobiles:n.remark_mobiles,description:n.description,remark:n.remark,userid:n.xgInfoObj.userid,external_userid:n.xgInfoObj.external_userid}};i._id=n.xgInfoObj._id,i.req.update_date=(new Date).getTime(),uni.showLoading({title:"修改中..."});var r={action:"updateQywxClient",params:i};(0,l.qywxClientApi)(r).then((function(e){uni.showToast({title:"客户修改成功",icon:"none",duration:888,mask:!0}),n.addCzjlFun("update"),setTimeout((function(){uni.navigateBack()}),888)}))},addCzjlFun:function(e,a){var t={create_date:(new Date).getTime(),czRen:uni.$userInfo._id,pageType:"client"};if("update"==e){var l=n.xgInfoObj;t.dataId=l._id,t.type="编辑",t.newUpdate=(new Date).getTime(),t.oldUpdate=l.update_date;var i=[],r="";n.remark!=l.remark&&(r='修改 客户名称 ，由 "'+l.remark+'" 变更为 "'+n.remark+'"',i.push(r)),n.remark_company!=l.remark_company&&(r='修改 客户简介 ，由 "'+l.remark_company+'" 变更为 "'+n.remark_company+'"',i.push(r));var u=n.remark_mobiles.join(","),o=l.remark_mobiles.join(",");u!=o&&(r='修改 联系方式 ，由 "'+o+'" 变更为 "'+u+'"',i.push(r)),n.description!=l.description&&(r='修改 企微备注 ，由 "'+l.description+'" 变更为 "'+n.description+'"',i.push(r)),t.content=i.reverse()}else t.dataId=a,t.type="添加";uni.$czjlApiAddFun(t)},setDataFun:function(){var e=uni.$infoObj;n.xgInfoObj=uni.$infoObj,n.remark=e.remark;var a=e.remark_mobiles;n.remark_mobiles=a,n.remark_company=e.remark_company,n.description=e.description;for(var t=[],l=0;l<a.length;l++)t.push({text:a[l]});n.phones=t},addPhonesFun:function(){n.phones=[{text:""}]},addPhonesItemFun:function(){var e=n.phones;e.push({text:""}),n.phones=e},deletePhonesItemFun:function(e){var a=n.phones;a[e].text?uni.showModal({title:"提示",content:"是否确认删除该条联系方式："+a[e].text,success:function(t){t.confirm&&(a.splice(e,1),n.phones=a)}}):(a.splice(e,1),n.phones=a)}}};a.default=i},d39c:function(e,a){}}]);