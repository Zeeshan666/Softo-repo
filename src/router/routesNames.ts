import Vue from "vue";

export interface IRoutesNames {
  Login: string;
  dashboard: string;
}

const routesNames: Readonly<IRoutesNames> = {
  Login: "home",
  dashboard: "dashboard",
};

declare module "vue/types/vue" {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Vue {
    $routesNames: IRoutesNames;
  }
}

export default routesNames;
