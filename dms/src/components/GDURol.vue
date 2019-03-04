<template>
    <v-layout align-start>
        <v-flex>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Roles</v-toolbar-title>
                    <v-divider
                    class="mx-2"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                        <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>                
                    <v-spacer></v-spacer>

                </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="gduroles"
                :search="search"                
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">




                    <td>{{ props.item.nombre }}</td>
                    <td>{{ props.item.descripcion }}</td>

                    <td>
                        <div v-if="props.item.condicion">
                            <span class="blue--text" > Activo </span>
                        </div>
                        <div v-else>
                            <span class="red--text" > Desactivo </span>
                        </div>
                    </td>

                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>            
        </v-flex>
    </v-layout>
</template>

<script>
    import axios from 'axios'
    export default {
      data(){
          return{
            gduroles:[],
            dialog: false,
            headers: [              
                { text: 'Nombre', value: 'nombre' },
                { text: 'Descripcion', value: 'descripcion' },
                { text: 'Estado', value: 'condicion' }
            
            ],
            search: ''
          }
      },

      computed: {
      },

      watch: {
      },

      created () {
            //this.initialize()
            this.listar()
      },


      methods:{
        listar(){
            let me=this;
            axios.get('api/gdurol/listar').then(function(response){
                console.log(response);
                me.gduroles = response.data;
            }).catch(function(error){
                console.log(error);
            })
        },

        initialize () {
        this.desserts = [
            {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0
            },
            {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3
            },
            {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0
            },
            {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3
            },
            {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9
            },
            {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0
            },
            {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0
            },
            {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5
            },
            {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9
            },
            {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7
            }
        ]
        },



      } 
    }
</script>

