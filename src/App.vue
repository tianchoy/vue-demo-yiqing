<script setup lang="ts">
import { onMounted } from 'vue';
import bg from './assets/img/1.jpg'
import * as echarts from 'echarts' //echarts 5 需要导出对象
import { useStore } from './stores'
//import option from './utils/mapData'
import geoCoorMap from './assets/geoMap'
import './assets/china'
import 'animate.css'

const store = useStore()
//请求列表信息
onMounted(async () => {
  await store.getList()
  intCharts()
  initPie()
  initLine()
})

//地图渲染函数
const intCharts = () => {
  const city = store.list.diseaseh5Shelf.areaTree[0].children
  console.log(city)
  store.item = <[]>city[1].children
  const data = city.map((v) => {
    return {
      name: v.name,
      value: geoCoorMap[v.name].concat(v.total.nowConfirm),
      children: v.children
    }
  })

  const charts = echarts.init(document.querySelector('#china') as HTMLElement)
  //设置 charts的参数
  charts.setOption(
    {
      geo: {
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"],
        layoutSize: "120%",
        itemStyle: {
          //normal: {
          areaColor: {
            type: "linear-gradient",
            x: 0,
            y: 1200,
            x2: 1000,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#152E6E", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#0673AD", // 50% 处的颜色
              },
            ],
            global: true, // 缺省为 false
          },
          shadowColor: "#0f5d9d",
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          opacity: 0.5,
          //},
        },
        emphasis: {
          areaColor: "#0f5d9d",
        },

        regions: [
          {
            name: "南海诸岛",
            itemStyle: {
              areaColor: "rgba(0, 10, 52, 1)",
              borderColor: "rgba(0, 10, 52, 1)",
              // normal: {
              opacity: 0,
              label: {
                show: false,
                color: "#009cc9",
              },
              //},
            },
            label: {
              show: false,
              color: "#FFFFFF",
              fontSize: 12,
            },
          },
        ],
      },
      series: [
        {
          type: "map",
          map: "china",
          aspectScale: 0.8,
          layoutCenter: ["50%", "50%"], //地图位置
          layoutSize: "120%",
          zoom: 1, //当前视角的缩放比例
          // roam: true, //是否开启平游或缩放
          scaleLimit: {
            //滚轮缩放的极限控制
            min: 1,
            max: 2,
          },
          label: {
            show: true,
            color: "#FFFFFF",
            fontSize: 12,
          },
          itemStyle: {
            //normal: {
            areaColor: "#0c3653",
            borderColor: "#1cccff",
            borderWidth: 1.8,
            //},
          },
          emphasis: {
            areaColor: "#56b1da",
            label: {
              show: true,
              color: "#fff",
            },
          },
          data: data,
        },
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'pin',
          symbolSize: [45, 45],
          label: {
            show: true,
            color: '#fff',
            formatter(val: any) {
              return val.data.value[2]
            }
          },
          itemStyle: {
            color: '#D8BC37', //标志颜色
          },
          data: data,
        },
      ],
    })
  charts.on('click', (e: any) => {
    store.item = e.data.children
  })
}

const initPie = () => {
  const charts = echarts.init(document.querySelector('.container-left-pie') as HTMLElement)

  let data = store.cityDteail.map((c) => {
    return {
      name: c.city,
      value: c.nowConfirm
    }
  })

  charts.setOption({
    backgroundColor: '#223651',
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '10',
          }
        },
        data: data
      }
    ]
  })
}

const initLine = () => {
  const charts = echarts.init(document.querySelector('.container-left-line') as HTMLElement)
  charts.setOption({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  })
}

</script>

<template>
  <div :style="{ background: `url(${bg})` }" class="container">
    <div class="container-left">
      <div class="container-left-card">
        <section>
          <div>较昨天+ {{ store.chinaAdd.localConfirmH5 }}</div>
          <div>{{ store.chinaTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较昨天+ {{ store.chinaAdd.nowConfirm }}</div>
          <div>{{ store.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较昨天+ {{ store.chinaAdd.confirm }}</div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较昨天+ {{ store.chinaAdd.noInfect }}</div>
          <div>{{ store.chinaTotal.noInfect }}</div>
          <div>无症状者</div>
        </section>
        <section>
          <div>较昨天+ {{ store.chinaAdd.importedCase }}</div>
          <div>{{ store.chinaTotal.importedCase }}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较昨天+ {{ store.chinaAdd.dead }}</div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>累计死亡</div>
        </section>
      </div>
      <div class="container-left-pie"></div>
      <div class="container-left-line"></div>
    </div>
    <div id="china" class="container-center"></div>
    <div class="container-right">
      <table border="1px" class="table" cellspacing="0">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group tag="tbody" enter-active-class="animate__animated animate__flipInY">
          <tr :key="item.name" v-for="(item) in store.item">
            <td>{{ item.name }}</td>
            <td>{{ item.today.confirm }}</td>
            <td>{{ item.total.confirm }}</td>
            <td>{{ item.total.heal }}</td>
            <td>{{ item.total.dead }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<style lang="less">
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.container {
  height: 100%;
  display: flex;
  overflow: hidden;
  &-left {
    width: 300px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    &-pie {
      height: 300px;
      margin-top: 20px;
    }
    &_line {
      height: 300px;
      margin-top: 20px;
    }
    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;
      section {
        background: #223651;
        border: 1px solid #212028;
        padding: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        :last-child {
          font-size: 12px;
        }
        div:nth-child(2) {
          color: #41b0db;
          font-size: 16px;
          padding: 5px 0;
          font-weight: bold;
        }
      }
    }
  }
  &-center {
    flex: 1;
  }
  &-right {
    width: 300px;
  }
}
.table {
  width: 100%;
  background-color: #333;
  tr {
    color: #fff;
    font-size: 14px;
    th {
      white-space: normal;
    }
    td {
      width: 100px;
      white-space: normal;
      text-align: center;
    }
  }
}
</style>
