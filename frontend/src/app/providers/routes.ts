import { BlogPage } from "../../pages/blog/BlogPage"
import { BuyPage } from "../../pages/buy/BuyPage"
import { ComPro } from "../../pages/commercial-property/Commercial-property"
import { CounPro } from "../../pages/country-property/Country-property"
import { DevelPage } from "../../pages/developments/DevelopmentsPage"
import { HomePage } from "../../pages/home/HomePage"
import { ImmovablesPage } from "../../pages/immovables/ImmovablesPage"
import { ItemPage } from "../../pages/itemPage/ItemPage"
import { NBCitemPage } from "../../pages/NBC/NBCitemePage"
import { NewBuild } from "../../pages/new-building-complexes/new-building-complexes"
import { Rental } from "../../pages/rental/Rental"
import { TeamPage } from "../../pages/team/TeamPage"


export type MyRoutesType = {
    url: string
    component: React.ComponentType
}
export const MyRoutes = [
    {
        url: '/',
        component: HomePage
    },
    {
        url: '/buy',
        component: BuyPage
    },
    
    {
        url: '/blog',
        component: BlogPage
    },
    {
        url: '/team',
        component: TeamPage
    },
    {
        url: '/ready-apartments',
        component: ImmovablesPage
    },
    {
        url: '/ready-apartments/:id',
        component: ItemPage
    },
    {
        url: '/rental-apartments',
        component: Rental   
    },
    {
        url: '/rental-apartments/:id',
        component: ItemPage   
    },
    {
        url: '/new-building-complexes',
        component: NewBuild
    },
    {
        url: '/new-building-complexes/:id',
        component: NBCitemPage
    },
    {
        url: '/new-building-apartments',
        component: DevelPage
    },
    {
        url: '/new-building-apartments/:id',
        component: ItemPage
    },
    {
        url: '/country-properties',
        component: CounPro
    },
    {
        url: '/country-properties/:id',
        component: ItemPage
    },
    {
        url: '/commercial-properties/',
        component: ComPro
    },
    {
        url: '/commercial-properties/:id',
        component: ItemPage
    },
    
    {
        url: '/immovables',
        component: ImmovablesPage
    },
    
]
export const MyRoutesPrivate = [
    {
        url: '/',
        component: HomePage
    },
    {
        url: '/blog',
        component: BlogPage
    },
    {
        url: '/immovables',
        component: ImmovablesPage
    },
    
]