import React from 'react';
import ReactDOM from 'react-dom';
import jsonData from './feiyan.json'
import './index.css'

let provincesObj = {}

jsonData.data.list.forEach((item,i)=>{
	if(provincesObj[item.province]==undefined){
		provincesObj[item.province] = {
			confirm:0,
			heal:0,
			dead:0,
		}
	}
	
	item.confirm = item.confirm?item.confirm:0;
	item.heal = item.heal?item.heal:0;
	item.dead = item.dead?item.dead:0;
	
	provincesObj[item.province] = {
		confirm:provincesObj[item.province].confirm + item.confirm,
		heal:provincesObj[item.province].heal + item.heal,
		dead:provincesObj[item.province].dead + item.dead,
	}
});

let provinceList = []
for(const key in provincesObj){
	provincesObj[key].province = key;
	provinceList.push(provincesObj[key])
}

console.log(provincesObj)
console.log(provinceList)

//排序
let provinceListSort = provinceList.sort((a,b)=>{
	if(a.confirm<b.confirm){
		return 1;
	}
	else{
		return -1;
	}
})

class Bili extends React.Component{
	constructor(props) {              //数据传给props  用props进行循环渲染
	    super(props)
		this.state = {
			defaultBackgroundLeft:true,
			defaultBackgroundRight:false,
			confirm:0,
			
		}
	}
	
	buttonClickedLeft(){
		this.setState({
			defaultBackgroundLeft: true,
			defaultBackgroundRight: false
		});
	}
	buttonClickedRight(){
		this.setState({
			defaultBackgroundLeft: false,
			defaultBackgroundRight: true
		});
	}
	
	//地图
	componentDidMount(){
	    function randomValue() {
	        return Math.round(Math.random()*1000);
	    }
	    var dataList=[
	        {name:"南海诸岛",value:0},
	        {name: '北京', value: randomValue()},
	        {name: '天津', value: randomValue()},
	        {name: '上海', value: randomValue()},
	        {name: '重庆', value: randomValue()},
	        {name: '河北', value: randomValue()},
	        {name: '河南', value: randomValue()},
	        {name: '云南', value: randomValue()},
	        {name: '辽宁', value: randomValue()},
	        {name: '黑龙江', value: randomValue()},
	        {name: '湖南', value: randomValue()},
	        {name: '安徽', value: randomValue()},
	        {name: '山东', value: randomValue()},
	        {name: '新疆', value: randomValue()},
	        {name: '江苏', value: randomValue()},
	        {name: '浙江', value: randomValue()},
	        {name: '江西', value: randomValue()},
	        {name: '湖北', value: randomValue()},
	        {name: '广西', value: randomValue()},
	        {name: '甘肃', value: randomValue()},
	        {name: '山西', value: randomValue()},
	        {name: '内蒙古', value: randomValue()},
	        {name: '陕西', value: randomValue()},
	        {name: '吉林', value: randomValue()},
	        {name: '福建', value: randomValue()},
	        {name: '贵州', value: randomValue()},
	        {name: '广东', value: randomValue()},
	        {name: '青海', value: randomValue()},
	        {name: '西藏', value: randomValue()},
	        {name: '四川', value: randomValue()},
	        {name: '宁夏', value: randomValue()},
	        {name: '海南', value: randomValue()},
	        {name: '台湾', value: randomValue()},
	        {name: '香港', value: randomValue()},
	        {name: '澳门', value: randomValue()}
	    ]
	    dataList = dataList.map((item,index)=>{
	        if(provincesObj[item.name]){
	            item.value = provincesObj[item.name].confirm;
	        }else{
	            item.value = 0;
	        }
	        return item
	        
	    })
	    var myChart = window.echarts.init(document.getElementById('map'));
	    
	    let option = {
	        tooltip: {
	                formatter:function(params,ticket, callback){
	                    return params.seriesName+'<br />'+params.name+'：'+params.value
	                }//数据格式化
	            },
	        visualMap: {
	            min: 0,
	            max: 1500,
	            left: 'left',
	            top: 'bottom',
	            text: ['高','低'],//取值范围的文字
	            inRange: {
	                color: ['#F5DEB3', '#800000']//取值范围的颜色
	            },
	            show:true//图注
	        },
	        geo: {
	            map: 'china',
	            roam: false,//不开启缩放和平移
	            zoom:1.23,//视角缩放比例
	            label: {
	                normal: {
	                    show: true,
	                    fontSize:'10',
	                    color: 'rgba(0,0,0,0.7)'
	                }
	            },
	            itemStyle: {
	                normal:{
	                    borderColor: 'rgba(0, 0, 0, 0.2)'
	                },
	                emphasis:{
	                    areaColor: '#3399ff',//鼠标选择区域颜色
	                    shadowOffsetX: 0,
	                    shadowOffsetY: 0,
	                    shadowBlur: 20,
	                    borderWidth: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        },
	        series : [
	            {
	                name: '现有确诊病例',
	                type: 'map',
	                geoIndex: 0,
	                data:dataList
	            }
	        ]
	    };
	
	    console.log(option)
	    console.log(myChart)
	    myChart.setOption(option);
	}
	
	
	render(){
		let coverTabLeftStyleObj = {
			background:this.state.defaultBackgroundLeft?'white':'#f1f1f1'
		}
		let coverTabRightStyleObj = {
			background:this.state.defaultBackgroundRight?'white':'#f1f1f1'
		}
		let time = new Date().toLocaleTimeString()
		let sum={
			confirm:0,
			heal:0,
			dead:0,
		}
		this.props.list.forEach((item,i)=>{
			sum = {
				confirm : sum.confirm + item.confirm,
				heal: sum.heal + item.heal,
				dead: sum.dead + item.dead,
			}
		})

		return (
		<div className='main'>
			<div className = 'cover'>
				<img className = 'coverLog' src='data:image/png;base64,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'></img>
				<button className='coverMoreInfo'>
				<div className='coverMoreInfoText'>更多疫情信息</div>
				<img className='coverMoreInfoImg' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAMAAAAYoR5yAAAAQlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////8IX9KGAAAAFXRSTlMAZpJcYZaKa+7es6WjnY2GdHNOLgfgMQtzAAAASUlEQVQI13XKSQ7AIAxD0QAFOs///let1CRqN3j1ZFvSEMRSILkjdA0Hd/71K1T38X0uWFQnjPerBLO4JlWArKoQVTtsYnNfTA8WagNMAfPIegAAAABJRU5ErkJggg=='></img>
				</button>
				<div className='coverTitle'>科学防护 共度难关</div>
				<div className='coverSubTitle'>肺炎疫情实时动态播报</div>
			</div>
			
			<div className='coverCards'>
				<div className='coverTabs'>
					<button style={coverTabLeftStyleObj} className= 'coverTabLeft' onClick={this.buttonClickedLeft.bind(this)}>全国疫情数据(含港澳台)</button>
					<button style={coverTabRightStyleObj} className= 'coverTabRight' onClick={this.buttonClickedRight.bind(this)}>湖北疫情数据</button>
				</div>
				<div className='coverDate'>
					<div className='coverConfirm'>
						<div className='dateTitle'>累计确诊</div>
						{
							this.props.list.map((item,index)=>{
								if(item.province === '湖北'&&this.state.defaultBackgroundRight){
									return <div className='dateNumber' style={{color:'#a31d13'}}>{item.confirm}</div>
								}
							})
						}
						{
							this.props.list.map((item,index)=>{
								if(item.province === '湖北'&&this.state.defaultBackgroundLeft){
									return <div className='dateNumber' style={{color:'#a31d13'}}>{sum.confirm}</div>
								}
							})
						}
					</div>
					<div className='coverDead'>
						<div className='dateTitle'>累计死亡</div>
						{
							this.props.list.map((item,index)=>{
								if(item.province === '湖北'&&this.state.defaultBackgroundRight){
									return <div className='dateNumber' style={{color:'#a31d13'}}>{item.dead}</div>
								}
							})
						}
						{
							this.props.list.map((item,index)=>{
								if(item.province === '湖北'&&this.state.defaultBackgroundLeft){
									return <div className='dateNumber' style={{color:'#a31d13'}}>{sum.dead}</div>
								}
							})
						}
					</div>
					<div className='coverHeal'>
						<div className='dateTitle'>累计治愈</div>
						{
							this.props.list.map((item,index)=>{
								if(item.province === '湖北'&&this.state.defaultBackgroundRight){
									return <div className='dateNumber' style={{color:'#a31d13'}}>{item.heal}</div>
								}
							})
						}
						{
							this.props.list.map((item,index)=>{
								if(item.province === '湖北'&&this.state.defaultBackgroundLeft){
									return <div className='dateNumber' style={{color:'#a31d13'}}>{sum.heal}</div>
								}
							})
						}
					</div>
					<div className='coverTime'>截至{time}</div>
				</div>
			</div>
			
			<div className='toolBox'>
				<div className='toolBoxItem'>
					<img className='toolBoxIcon' src='https://static.ws.126.net/163/f2e/news/virus_report/static/images/tool_travel.c4682eb.png'></img>
					<div className='toolBoxName'>同城查询</div>
				</div>
				<div className='toolBoxItem'>
					<img className='toolBoxIcon' src='https://static.ws.126.net/163/f2e/news/virus_report/static/images/tool_shelter.b60c72f.png'></img>
					<div className='toolBoxName'>确诊小区</div>
				</div>
				<div className='toolBoxItem'>
					<img className='toolBoxIcon' src='https://static.ws.126.net/163/f2e/news/virus_report/static/images/tool_hospital.9c45227.png'></img>
					<div className='toolBoxName'>门诊查询</div>
				</div>
				<div className='toolBoxItem'>
					<img className='toolBoxIcon' src='https://static.ws.126.net/163/f2e/news/virus_report/static/images/tool_truth.d4f3ec3.png'></img>
					<div className='toolBoxName'>辟谣专区</div>
				</div>
			</div>
			<div className='toolBoxButtom'></div>
			<div className='mapBlock'>
				<div className='mapTitle'>
					<div className='mapTitleLeft'></div>
					<div className='mapTitleTex'>中国疫情图</div>
				</div>
				<div className='map'>
					<div id='map'></div>
				</div>
			</div>
			<div className='lineChartTit'>中国病例</div>
			<div className='chartName'>
				<li>
					<span className='chartNameTit'>地区</span>
					<span style={{color:'#e54e3d'}} className='chartNameTit'>确诊</span>
					<span className='chartNameTit'>死亡</span>
					<span className='chartNameTit'>治愈</span>
				</li>
			</div>
			<div className='lineChart'>
				<ul>
					{
						this.props.list.map((item,index)=>{
							return (
								<li>
									<span className='chartProvince'>{item.province}</span>
									<span className='chartConfirm'>{item.confirm}</span>
									<span className='chartDeadAHeal'>{item.dead}</span>
									<span className='chartDeadAHeal'>{item.heal}</span>
								</li>
							)
						})
					}
				</ul>
			</div>
		</div>
			
		)
	}
}

ReactDOM.render(<Bili list={provinceListSort}></Bili>, document.getElementById('root'));