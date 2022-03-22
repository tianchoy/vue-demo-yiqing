export interface ChinaAdd {
    confirm: number;
    heal: number;
    dead: number;
    nowConfirm: number;
    suspect: number;
    nowSevere: number;
    noInfectH5: number;
    importedCase: number;
    noInfect: number;
    localConfirm: number;
    localConfirmH5: number;
}

export interface ShowAddSwitch {
    confirm: boolean;
    suspect: boolean;
    dead: boolean;
    importedCase: boolean;
    localConfirm: boolean;
    localinfeciton: boolean;
    all: boolean;
    heal: boolean;
    nowConfirm: boolean;
    nowSevere: boolean;
    noInfect: boolean;
}

export interface Today {
    confirm: number;
    isUpdated: boolean;
}

export interface Total {
    showRate: boolean;
    heal: number;
    showHeal: boolean;
    wzz: number;
    provinceLocalConfirm: number;
    nowConfirm: number;
    confirm: number;
    dead: number;
}

export interface Today2 {
    confirm: number;
    confirmCuts: number;
    isUpdated: boolean;
    tip: string;
    wzz_add: number;
}

export interface Total2 {
    showRate: boolean;
    heal: number;
    showHeal: boolean;
    wzz: number;
    provinceLocalConfirm: number;
    nowConfirm: number;
    confirm: number;
    dead: number;
}

export interface Today3 {
    confirm: number;
    confirmCuts: number;
    isUpdated: boolean;
}

export interface Total3 {
    nowConfirm: number;
    confirm: number;
    dead: number;
    showRate: boolean;
    heal: number;
    showHeal: boolean;
    wzz: number;
    provinceLocalConfirm: number;
    grade: string;
}

export interface Child2 {
    name: string;
    today: Today3;
    total: Total3;
}

export interface Child {
    name: string;
    today: Today2;
    total: Total2;
    children: Child2[];
}

export interface AreaTree {
    today: Today;
    total: Total;
    children: Child[];
    name: string;
}

export interface ChinaTotal {
    confirm: number;
    heal: number;
    dead: number;
    noInfect: number;
    showlocalinfeciton: number;
    localConfirmH5: number;
    nowConfirm: number;
    localConfirm: number;
    suspect: number;
    importedCase: number;
    noInfectH5: number;
    local_acc_confirm: number;
    nowSevere: number;
    showLocalConfirm: number;
}

export interface Diseaseh5Shelf {
    chinaAdd: ChinaAdd;
    isShowAdd: boolean;
    showAddSwitch: ShowAddSwitch;
    areaTree: AreaTree[];
    lastUpdateTime: string;
    chinaTotal: ChinaTotal;
}

export interface StatisGradeCityDetail {
    city: string;
    nowConfirm: number;
    grade: string;
    date: string;
    syear: number;
    province: string;
    confirm: number;
    dead: number;
    heal: number;
    sdate: string;
    confirmAdd: number;
}

export interface RootObject {
    diseaseh5Shelf: Diseaseh5Shelf;
    statisGradeCityDetail: StatisGradeCityDetail[];
}