import { defineStore } from 'pinia'
import { getApiList } from '@/server'
import type { RootObject, Child, ChinaTotal,ChinaAdd,StatisGradeCityDetail} from './type'

export const useStore = defineStore({
  id: 'counter',
  state: () => ({
    list: <RootObject>{},
    item:<Child[]>[],
    chinaTotal:<ChinaTotal>{},
    chinaAdd:<ChinaAdd>{},
    cityDteail:<StatisGradeCityDetail[]>[]
  }),
  actions:{
    //获取列表信息
    async getList(){
      const res = await getApiList()
      //console.log(res);
      this.list = res,
      this.chinaAdd = this.list.diseaseh5Shelf.chinaAdd
      this.chinaTotal = this.list.diseaseh5Shelf.chinaTotal
      this.cityDteail = this.list.statisGradeCityDetail.splice(0,10)
    }
  }
})
