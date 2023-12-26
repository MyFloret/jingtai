//document.write("<script src=\"http://api.map.baidu.com/api?v=1.3\" type=\"text/javascript\"></script>");
document.write("<script type=\"text/javascript\" src=\"https://api.map.baidu.com/api?v=2.0&ak=0yEVV5Tms7zcetZpqogrmxDt\"></script>");
// 百度地图API功能
function SpdlMap() {
    this.PanelID = "SpdlMap";
    this.Lng = '116.404 ';
    this.Lat = '39.915';    
    this.Level = 13;
    this.IsInfoWindow = true;
    this.Address = "";
    this.CompanyName = "";
    this.lnglatArray = [
          ['119.701444', '29.143791'],
          ['114.399073', '34.741958']
        ]

    this.CreateCompanyMap = function () {       
        document.write("<div id=" + this.PanelID + " ></div>");
        LoadSite(this.PanelID, this.Lng, this.Lat, this.IsInfoWindow, this.CompanyName, this.Level, this.Address);        
    }   
}
function LoadSite(divId, lng, lat, infoWindow, CompanName, SizeCent, address) {
    var map = new BMap.Map(divId);
    if (lng.length < 3 || lat.length < 3) {
        if (address.indexOf('市辖区')) {
            address = address.replace('市辖区', '');
        }
        if (address.indexOf('市辖县')) {
            address = address.replace('市辖县', '');
        }
        address = address.replace(/\s+/g, ""); 
        if(address.length<1)
        {
            CreatAddesMap(divId, infoWindow, "该客户未提交公司地址，此处为食品代理网地址", SizeCent, "河南省郑州市金水区国际企业中心B座");
        }
        else
        {
            CreatAddesMap(divId, infoWindow, "此公司还没有进行准确定位，此为该公司大概位置", SizeCent, address);   
       }    
    }
    else {
        var point = new BMap.Point(lng, lat);       
        var marker = new BMap.Marker(point);  // 创建标注
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
	    map.addOverlay(marker);              // 将标注添加到地图中
	    map.centerAndZoom(point, SizeCent);       
	    var opts = {	
	      title : CompanName, // 信息窗口标题	  
	    };
	    var infoWindow = new BMap.InfoWindow("地址："+address, opts);  // 创建信息窗口对象 
	    marker.addEventListener("click", function(){          
		    map.openInfoWindow(infoWindow,point); //开启信息窗口
	    });         
        var label = new BMap.Label(CompanName, { offset: new BMap.Size(20, -15) });
        label.setStyle({ color: "#e70505", fontSize: "14px", border: "solid #c3c3c3 1px", height: "24px", background: "#ffffde" });
        marker.setLabel(label);
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        map.enableScrollWheelZoom(true);
    }
    
}
function CreatAddesMap(divId, infoWindow, Companyinfo, SizeCent, address) {
    var map = new BMap.Map(divId);
    var point = new BMap.Point(116.331398,39.897445);
	map.centerAndZoom(point,12);
	// 创建地址解析器实例
	var myGeo = new BMap.Geocoder();
	// 将地址解析结果显示在地图上,并调整地图视野
	myGeo.getPoint(address, function(point){
		if (point) {
			map.centerAndZoom(point, SizeCent);
			var marker = new BMap.Marker(point);  // 创建标注
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
	        map.addOverlay(marker);              // 将标注添加到地图中                  
             var label = new BMap.Label(Companyinfo, { offset: new BMap.Size(-150, 24) });
            label.setStyle({ color: "#e70505", fontSize: "14px", border: "solid #c3c3c3 1px", height: "24px",  background: "#ffffde", padding: "2px 0 0 5px" });
            marker.setLabel(label);
		}else{
            CreatAddesMap(divId, infoWindow, "该客户未提交公司地址，此处为食品代理网地址", SizeCent, "河南省郑州市金水区国际企业中心B座"); 
		}
	}, "北京市");  
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.enableScrollWheelZoom(true);
}