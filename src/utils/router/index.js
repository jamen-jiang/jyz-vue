import router from '@/router';
const setRouter = modules => {
  if (modules.length > 0) {
    modules.forEach(module => {
      if (module.Children.length <= 0) {
        if (module.Type == 1) {
          var route = {
            path: module.VueUri,
            component: null,
            name: module.Name,
          };
          if (module.VueUri != '/') {
            var vueUri = module.VueUri;
            if (vueUri.substring(0, 1) == '/') vueUri = module.VueUri.substring(1);
            let array = vueUri.split('/');
            // let url =
            //   array[0].substring(0, 1).toUpperCase() +
            //   array[0].substring(1) +
            //   '/' +
            //   array[1].substring(0, 1).toUpperCase() +
            //   array[1].substring(1) +
            //   '/index';
            let url =
              array[0].substring(0, 1) +
              array[0].substring(1) +
              '/' +
              array[1].substring(0, 1) +
              array[1].substring(1) +
              '/index';
            route['component'] = resolve => require([`@/views/${url}`], resolve);
            route['meta'] = module;
          }
          router.options.routes[0].children.push(route);
        }
      } else {
        setRouter(module.Children);
      }
    });
    router.addRoutes(router.options.routes);
  }
};

export { setRouter };
