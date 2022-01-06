# Como comenzar en webpack con Angular 💥👾

Bueno en primer lugar en este tutorial utilizaremos la librería, module federation apoyandonos de esto https://www.npmjs.com/package/@angular-architects/module-federation 

## Crea el workspace

Tu puedes utilizar la forma habitual para la creación de workspace de las siguiente forma

```ng new workspace --createApplication=false```

## Crea el el proyecto Host
Luego dentro del workspace, crea el proyecto contenedor de los demás es conocido como el shell o el host

```ng generate application host --style=scss --routing=true```

## Crea tu proyecto que sera el primer mf
Dentro del workspace, se puede crear el mf con el mismo comando del anterior

```ng generate application mf-name --style=scss --routing=true```

## Utilicemos Module Federation
Como te mencioné al comienzo, emplearemos una librería que nos ayudará con este fin 👾

Primero el host 💻

```ng add @angular-architects/module-federation --project host --port xxxx``` 

Luego el mf-name ⚛️

```ng add @angular-architects/module-federation --project mf-name --port nnnn``` 

## Configuraciones adicionales [mf-name]

En el mf debes configurar los temas relacionados al webpack y a la exposición de módulos

### Configura tu webpack
Debes configurar el nombre del microfrontend y los módulos a exponer:

```js
library: { type: "module" },
    name: "mf-name",
    filename: "remoteEntry.js",
    exposes: {
    './NameModule': './projects/mf/src/app/NameFolderMoule/NameModule.module.ts',
    },
    ...
```
Ten cuidado ☢️⚠️, debes agregar a las dependencias comunes rxjs:
```js
shared: share({
    "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    rxjs: {
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
        includeSecondaries: true,
    },
    ...
```

### Configura tu router 
De forma que exponga los módulos deseados ante los endpoints esperados sean expuestos
```ts
const routes: Routes = [
    {
    path:'',
    component: ShowmfComponent,

    },
    {
    path: 'mf',
    loadChildren: () => 
        import("./NameFolderMoule/NameModule.module").then((m) => m.NameModule),
    },
];

```
## Configuraciones adicionales [host]

En el host debes configurar los temas relacionados al webpack y a la captura de los módulos externos

### Configura tu webpack 
Debes configurar el nombre del microfrontend que leeras y su ruta de exposición:

```js
...
remotes: {
    mf-name: "http://localhost:nnnn/remoteEntry.js",
},
...
```
Ten cuidado ☢️⚠️, debes agregar a las dependencias comunes rxjs:
```js
shared: share({
    "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    rxjs: {
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
        includeSecondaries: true,
    },
```

### Configura tu router 
De forma que obtenga los elementos expuestos
```ts
const routes: Routes = [
  {
    path:'', component: HomeComponent, pathMatch: 'full'
  },
  {
    path: 'mf-name',
    loadChildren: () =>
      import('mf-name/NameModule').then((m) => m.NameModule),
  }
];
```
Esto detonará un error pues no existe el módulo por lo tanto en la ruta raiz es decir en host/src/app debes crear el archivo decl.d.ts para que el compilador pueda resolverlo de buena forma. Ahora dentro del archivo pones la siguiente linea:

```declare module 'mf/ShowinfoModule'```

# DISFRUTA DE TU APP CON MODULE FEDERATION 🥳🔥