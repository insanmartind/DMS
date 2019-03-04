<template>
    <v-layout align-start>
        <v-flex>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Aprobaciones</v-toolbar-title>
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
                                        <v-text-field v-model="dmsAprobacionName" label="Aprobacion"></v-text-field>
                                    </v-flex>                                    
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="aprobador1" label="Aprobador1"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="aprobador2" label="Aprobador2"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="aprobador3" label="Aprobador3"></v-text-field>
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
                                el item {{ dmsAprobacionName }}
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
                :items="dmsAprobacion"
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

                        <template v-if="props.item.dmsAprobacionActive">
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

                    <td>{{ props.item.dmsAprobacionID }}</td>
                    <td>{{ props.item.dmsAprobacionName }}</td>
                    <td>{{ props.item.aprobador1 }}</td>
                    <td>{{ props.item.aprobador2 }}</td>
                    <td>{{ props.item.aprobador3 }}</td>

                    <td>
                        <div v-if="props.item.dmsAprobacionActive == 1">
                            <span class="blue--text" > Activo </span>
                        </div>
                        <div v-if="props.item.dmsAprobacionActive == 0">
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
            dmsAprobacion:[],
            dialog: false,
            headers: [
                { text: 'Acción', value: 'accion', sortable: false },                
                { text: 'dmsAprobacionID', value: 'dmsAprobacionID' },
                { text: 'dmsAprobacionName', value: 'dmsAprobacionName' },
                { text: 'aprobador1', value: 'aprobador1' },
                { text: 'aprobador2', value: 'aprobador2' },
                { text: 'aprobador3', value: 'aprobador3' },
                { text: 'dmsAprobacionActive', value: 'dmsAprobacionActive' }
            
            ],
            search: '',
            desserts: [],
            editedIndex: -1,
            dmsAprobacionID: '',
            dmsAprobacionName: '',
            aprobador1: '',
            aprobador2: '',
            aprobador3: '',
            valida: 0,
            validaMensaje:[],
            adModal: 0,
            adAccion: 0,
            adAprobacionName: 0,
            adaprobador1: 0,
            adaprobador2: 0,
            adaprobador3: 0,
            adAprobacionId: ''
          }
      },

      computed: {
            formTitle () {
            return this.editedIndex === -1 ? 'Nuevo Aprobacion' : 'Editando Aprobacion'
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
            axios.get('api/dmsAprobacion/listar').then(function(response){
                console.log(response);
                me.dmsAprobacion = response.data;
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
            this.dmsAprobacionID = item.dmsAprobacionID;
            this.dmsAprobacionName = item.dmsAprobacionName;
            this.aprobador1 = item.aprobador1;
            this.aprobador2 = item.aprobador2;
            this.aprobador3 = item.aprobador3;
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
            this.dmsAprobacionID="";
            this.dmsAprobacionName="";
            this.aprobador1="";
            this.aprobador2="";
            this.aprobador3="";
            this.editedIndex = -1;
        },
        grabar () {
            if (this.validar())
                return;

            if (this.editedIndex > -1) {
                // Codigo para editar
                let me=this;
                axios.put('api/dmsAprobacion/Actualizar',{
                    'DMSAprobacionID': me.dmsAprobacionID,
                    'DMSAprobacionName': me.dmsAprobacionName,
                    'Aprobador1': me.aprobador1,
                    'Aprobador2': me.aprobador2,
                    'Aprobador3': me.aprobador3
                }).then(function(response){
                    me.close();
                    me.listar();
                    me.limpiar();                        
                }).catch(function(error){
                    console.log(error);
                });                       
            } else {
                // Codigo para grabar
                    var aprobacionnombre = this.dmsAprobacionName;
                    var aprobador1a = this.aprobador1;

                    //alert("crea registro aprobacion...........");
                    //alert("me.dmsAprobacionName -> " + aprobacionnombre);
                    //alert("me.aprobador1 -> " + aprobador1a);

                    let me=this;
                    axios.post('api/dmsAprobacion/Crear',{
                        'DMSAprobacionName': me.dmsAprobacionName,
                        'Aprobador1': me.aprobador1,
                        'Aprobador2': me.aprobador2,
                        'Aprobador3': me.aprobador3
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
            
            if(this.dmsAprobacionName.length < 5 || this.dmsAprobacionName.length > 30){
                this.validaMensaje.push("El nombre de la aprobacoin debe tener mas de 5 caracteres y menos de 30 caracteres");
            }
            if(this.validaMensaje.length)
               this.valida=1;
            
            return this.valida;
        },
        
        activarDesactivarMostrar(accion,item){
            this.adModal = 1;
            this.dmsAprobacionName = item.dmsAprobacionName;
            this.adAprobacionId = item.dmsAprobacionID;

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
            axios.put('api/dmsAprobacion/Activar/' + this.adAprobacionId ,{}).then(function(response){
                me.adModal=0;
                me.adAccion=0;
                me.dmsAprobacionName="";
                me.aprobador1="";
                me.aprobador2="";
                me.aprobador3="";
                me.adAprobacionId="";
                me.listar();
            }).catch(function(error){
                console.log(error);
            }); 
        },
        
        desactivar(){
            let me=this;
            axios.put('api/dmsAprobacion/Desactivar/' + this.adAprobacionId ,{}).then(function(response){
                me.adModal=0;
                me.adAccion=0;
                me.dmsAprobacionName="";
                me.aprobador1="";
                me.aprobador2="";
                me.aprobador3="";
                me.adAprobacionId="";
                me.listar();
            }).catch(function(error){
                console.log(error);
            });
        }

      } 
    }
</script>

