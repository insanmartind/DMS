<template>
<div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template>
          <v-list-tile :to="{ name: 'home'}">

            <v-list-title-action>
              <v-icon>home</v-icon>
            </v-list-title-action>

            <v-list-title-title>
              Inicio
            </v-list-title-title>

          </v-list-tile>
        </template>

        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Ingresos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          
          <v-list-tile :to="{ name: ''}">
            <v-list-title-action>
              <v-icon>table_chart</v-icon>
            </v-list-title-action>
            <v-list-tile-content>
               <v-list-tile-title>
                  Documentos
               </v-list-tile-title>
             </v-list-tile-content>
          </v-list-tile>
          
          <v-list-tile :to="{ name: ''}">
            <v-list-title-action>
              <v-icon>table_chart</v-icon>
            </v-list-title-action>
            <v-list-tile-content>
               <v-list-tile-title>
                  Intercompany
               </v-list-tile-title>
             </v-list-tile-content>
          </v-list-tile>

          </v-list-group>
        </template>

        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Maestros
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          
          <v-list-tile :to="{ name: 'DMSLocal'}">
            <v-list-title-action>
              <v-icon>table_chart</v-icon>
            </v-list-title-action>
            <v-list-tile-content>
               <v-list-tile-title>
                  Locales
               </v-list-tile-title>
             </v-list-tile-content>
          </v-list-tile>

          </v-list-group>
        </template>

        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Administracion
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          
          <v-list-tile :to="{ name: ''}">
            <v-list-title-action>
              <v-icon>table_chart</v-icon>
            </v-list-title-action>
            <v-list-tile-content>
               <v-list-tile-title>
                  Usuarios
               </v-list-tile-title>
             </v-list-tile-content>
          </v-list-tile>

          </v-list-group>
        </template>


      </v-list>

    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">DMS</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <v-footer dark height="auto">
      <v-layout justify-center>
        <v-flex text-xs-center>
          <v-card flat tile color="primary" class="white--text">
            <v-card-text class="white--text pt-0">
              MetsoIT &copy;2019
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>

  </v-app>
</div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
       drawer: null,
    }
  }
}
</script>
