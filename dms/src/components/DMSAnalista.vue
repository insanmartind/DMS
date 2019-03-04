<template>
    <v-layout align-start>
        <v-flex>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Analistas</v-toolbar-title>
                    <v-divider
                    class="mx-2"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                        <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>                
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo</v-btn>
                        <v-card>
                            <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                            </v-card-title>
                
                            <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="email" label="Email"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12 v-show="valida">
                                       <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">

                                       </div>
                                    </v-flex>  

                                </v-layout>
                            </v-container>
                            </v-card-text>
                
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                                <v-btn color="blue darken-1" flat @click="grabar">Grabar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="adModal" max-width="300px">
                        <v-card>
                            <v-card-title>
                                <span class="headline" v-if="adAccion==1">¿Activar Analista?</span>
                            </v-card-title>
                            <v-card-title>
                                <span class="headline" v-if="adAccion==2">¿Desactivar Analista?</span>
                            </v-card-title>
                            <v-card-text>
                                Estás a punto de:
                                <span v-if="adAccion==1">Activar </span>
                                <span v-if="adAccion==2">Desactivar </span>
                                el item {{ email }}
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click="activarDesactivarCerrar">Cancelar</v-btn>
                                <v-btn v-if="adAccion==1" color="orange darken-4" flat="flat" @click="activar">Activar</v-btn>
                                <v-btn v-if="adAccion==2" color="orange darken-1" flat="flat" @click="desactivar">Desativar</v-btn>
                            </v-card-actions>
                        </v-card>                        
                    </v-dialog>
                </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="dmsAnalista"
                :search="search"                
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">

                    <td class="justify-center layout px-0">
                        <v-icon
                        small
                        class="mr-2"
                        @click="editItem(props.item)"
                        >
                        edit
                        </v-icon>

                        <template v-if="props.item.dmsAnalistaActive">
                            <v-icon
                            small
                            @click="activarDesactivarMostrar(2, props.item)"
                            >
                            block
                            </v-icon>
                        </template>
                        <template v-else>
                            <v-icon
                            small
                            @click="activarDesactivarMostrar(1, props.item)"
                            >
                            check
                            </v-icon>
                        </template>
                    </td>

                    <td>{{ props.item.dmsAnalistaID }}</td>
                    <td>{{ props.item.email }}</td>

                    <td>
                        <div v-if="props.item.dmsAnalistaActive == 1">
                            <span class="blue--text" > Activo </span>
                        </div>
                        <div v-if="props.item.dmsAnalistaActive == 0">
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
            dmsAnalista:[],
            dialog: false,
            headers: [
                { text: 'Acción', value: 'accion', sortable: false },                
                { text: 'dmsAnalistaID', value: 'dmsAnalistaID' },
                { text: 'email', value: 'email' },
                { text: 'dmsAnalistaActive', value: 'dmsAnalistaActive' }
            
            ],
            search: '',
            desserts: [],
            editedIndex: -1,
            dmsAnalistaID: '',
            email: '',
            valida: 0,
            validaMensaje:[],
            adModal: 0,
            adAccion: 0,
            adAnalistaName: 0,
            adAnalistaId: ''
          }
      },

      computed: {
            formTitle () {
            return this.editedIndex === -1 ? 'Nuevo Analista' : 'Editando Analista'
            }
      },

      watch: {
            dialog (val) {
            val || this.close()
            }
      },

      created () {
            //this.initialize()
            this.listar()
      },


      methods:{
        listar(){
            let me=this;
            axios.get('api/dmsAnalista/listar').then(function(response){
                console.log(response);
                me.dmsAnalista = response.data;
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

        editItem (item) {
            this.dmsAnalistaID = item.dmsAnalistaID;
            this.email = item.email;
            this.editedIndex = 1; 
            this.dialog = true
        },

        deleteItem (item) {
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        },

        close () {
            this.dialog = false
            this.limpiar();
        },
        limpiar(){
            this.dmsAnalistaID="";
            this.email="";
            this.editedIndex = -1;
        },
        grabar () {
            if (this.validar())
                return;

            if (this.editedIndex > -1) {
                // Codigo para editar
                let me=this;
                axios.put('api/dmsAnalista/Actualizar',{
                    'DMSAnalistaID': me.dmsAnalistaID,
                    'email': me.email
                }).then(function(response){
                    me.close();
                    me.listar();
                    me.limpiar();                        
                }).catch(function(error){
                    console.log(error);
                });                       
            } else {
                // Codigo para grabar
                    let me=this;
                    axios.post('api/dmsAnalista/Crear',{
                        'email': me.email
                    }).then(function(response){
                        me.close();
                        me.listar();
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });                
            }
        },

        validar(){
            this.valida=0;
            this.validaMensaje=[];
            
            if(this.email.length < 5 || this.email.length > 200){
                this.validaMensaje.push("El nombre del Analista debe tener mas de 5 caracteres y menos de 200 caracteres");
            }
            if(this.validaMensaje.length)
               this.valida=1;
            
            return this.valida;
        },
        
        activarDesactivarMostrar(accion,item){
            this.adModal = 1;
            this.email = item.email;
            this.adAnalistaId = item.dmsAnalistaID;

            if(accion == 1){
                //alert("Activar.." + item.email)
                this.adAccion = 1;
            }
            else if(accion == 2){
                //alert("Desactivar.." + item.email)
                this.adAccion = 2;
            }
            else {
                this.adModal = 0;
            }
        },
        activarDesactivarCerrar(){
            this.adModal=0;
        },
        activar(){
            let me=this;
            axios.put('api/dmsAnalista/Activar/' + this.adAnalistaId ,{}).then(function(response){
                me.adModal=0;
                me.adAccion=0;
                me.email="";
                me.adAnalistaId="";
                me.listar();
            }).catch(function(error){
                console.log(error);
            }); 
        },
        
        desactivar(){
            let me=this;
            axios.put('api/dmsAnalista/Desactivar/' + this.adAnalistaId ,{}).then(function(response){
                me.adModal=0;
                me.adAccion=0;
                me.email="";
                me.adAnalistaId="";
                me.listar();
            }).catch(function(error){
                console.log(error);
            });
        }

      } 
    }
</script>

