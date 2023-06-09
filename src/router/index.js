import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/pages/Home.vue";
import Login from "../components/pages/Login.vue";
import Caissieres from "../components/pages/Caissieres.vue";
import Serveuses from "../components/pages/Serveuses.vue";
import AddCaissiere from "../components/pages/AddCaissiere.vue";
import AddCaisses from "../components/pages/AddCaisses.vue";
import Caisses from "../components/pages/Caisses.vue";
import Categories from "../components/pages/Categories.vue";
import ListVente from "../components/pages/ListVente.vue";
import Approvissionnements from "../components/pages/Approvissionnements.vue";
import Addapro from "../components/pages/Addapro.vue";

import HomeCaisse from "../components/pages/serveuses/HomeCaisse.vue";

// Routes pourVente la serveuses
import Updateappro from "../components/pages/Updateappro.vue";

import Commandes from "../components/pages/serveuses/Commandes.vue";

import VentesCaisse from "../components/pages/serveuses/VentesCaisse.vue";

import DetailsVente from "../components/pages/serveuses/DetailsVente.vue";

import ListVisite from "../components/pages/ListVisite.vue";
import ListPlanning from "../components/pages/ListPlanning.vue";
import Produits from "../components/pages/Produits.vue";
import Devices from "../components/pages/Devices.vue";
import maps from "../components/pages/maps.vue";

import maps2 from "../components/pages/maps2.vue";

import Pdv from "../components/pages/Pdv.vue";

import More from "../components/pages/More.vue";

const routes = [
  {
    path: "/more",
    name: "More",
    component: More,
  },
  {
    path: "/maps2",
    name: "maps2",
    component: maps2,
  },
  {
    path: "/pdv",
    name: "Pdv",
    component: Pdv,
  },
  {
    path: "/maps",
    name: "maps",
    component: maps,
  },
  {
    path: "/listdevice",
    name: "Devices",
    component: Devices,
  },
  {
    path: "/listplanning",
    name: "ListPlanning",
    component: ListPlanning,
  },
  {
    path: "/listvisite",
    name: "ListVisite",
    component: ListVisite,
  },
  {
    path: "/details-vente",
    name: "DetailsVente",
    component: DetailsVente,
  },
  {
    path: "/vente-caisse",
    name: "VentesCaisse",
    component: VentesCaisse,
  },

  {
    path: "/dashboardcaisse",
    name: "HomeCaisse",
    component: HomeCaisse,
  },

  {
    path: "/commande",
    name: "Commandes",
    component: Commandes,
  },

  {
    path: "/updateapro",
    name: "Updateappro",
    component: Updateappro,
  },
  {
    path: "/addapro",
    name: "Addapro",
    component: Addapro,
  },
  {
    path: "/produits",
    name: "Produits",
    component: Produits,
  },
  {
    path: "/listvente",
    name: "ListVente",
    component: ListVente,
  },
  {
    path: "/approvisionnement",
    name: "Approvissionnements",
    component: Approvissionnements,
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/add-caissiere",
    name: "AddCaissiere",
    component: AddCaissiere,
  },
  {
    path: "/caisses",
    name: "Caisses",
    component: Caisses,
  },

  {
    path: "/caissieres",
    name: "Caissieres",
    component: Caissieres,
  },

  {
    path: "/serveuses",
    name: "Serveuses",
    component: Serveuses,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },

  {
    path: "/dashboard",
    name: "Home",
    component: Home,
  },

  {
    path: "/addcaisse",
    name: "AddCaisses",
    component: AddCaisses,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
