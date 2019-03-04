<template>
    <v-layout align-start>
        <v-flex>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Proveedores</v-toolbar-title>
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
                                    <v-flex xs6 sm6 md6>
                                        <v-text-field v-model="dmsRut" label="Rut"></v-text-field>
                                    </v-flex>                                    
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="dmsRazonSocial" label="RazonSocial"></v-text-field>
                                    </v-flex>
                                    <v-flex xs6 sm6 md6>
                                        <v-select v-model="dmsAnalistaID" :items="dmsAnalista" label="Analista">

                                        </v-select>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="dmsCodigoSAP" label="CodigoSAP"></v-text-field>
                                    </v-flex>     
                                    <v-flex xs6 sm6 md6>
                                        <v-select v-model="dmsAprobacionID" :items="dmsAprobacion" label="Aprobacion">

                                        </v-select>
                                    </v-flex> 
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="Banco" label="Banco"></v-text-field>
                                    </v-flex>       
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="CtaCte" label="CtaCte"></v-text-field>
                                    </v-flex>      
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="ValeVista" label="ValeVista"></v-text-field>
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
                                <span class="headline" v-if="adAccion==1">¿Activar Proveedor?</span>
                            </v-card-title>
                            <v-card-title>
                                <span class="headline" v-if="adAccion==2">¿Desactivar Proveedor?</span>
                            </v-card-title>
                            <v-card-text>
                                Estás a punto de:
                                <span v-if="adAccion==1">Activar </span>
                                <span v-if="adAccion==2">Desactivar </span>
                                el item {{ dmsRazonSocial }}
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
                :items="dmsProveedor"
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

                        <template v-if="props.item.dmsProveedorActive">
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

                    <td>{{ props.item.dmsProveedorID }}</td>
                    <td>{{ props.item.dmsRut }}</td>
                    <td>{{ props.item.dmsRazonSocial }}</td>
                    <td>{{ props.item.dmsAnalistaID }}</td>
                    <td>{{ props.item.dmsCodigoSAP }}</td>
                    <td>{{ props.item.dmsAprobacionID }}</td>
                    <td>{{ props.item.banco }}</td>
                    <td>{{ props.item.ctaCte }}</td>

                    <td>
                        <div v-if="props.item.valeVista">
                            <span class="blue--text" > Si </span>
                        </div>
                        <div v-else>
                            <span class="red--text" > No </span>
                        </div>
                    </td>

                    <td>
                        <div v-if="props.item.dmsProveedorActive">
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
            dmsProveedor:[],
            dialog: false,
            headers: [
                { text: 'Acción', value: 'accion', sortable: false },                
                { text: 'dmsProveedorID', value: 'dmsProveedorID' },
                { text: 'dmsRut', value: 'dmsRut' },
                { text: 'dmsRazonSocial', value: 'dmsRazonSocial' },
                { text: 'dmsAnalistaID', value: 'dmsAnalistaID' },
                { text: 'dmsCodigoSAP', value: 'dmsCodigoSAP' },
                { text: 'dmsAprobacionID', value: 'dmsAprobacionID' },
                { text: 'Banco', value: 'Banco' },
                { text: 'CtaCte', value: 'CtaCte' },
                { text: 'ValeVista', value: 'ValeVista' },
                { text: 'dmsProveedorActive', value: 'dmsProveedorActive' }
            
            ],
            search: '',
            desserts: [],
            editedIndex: -1,
            dmsProveedorID: '',
            dmsRut: '',
            dmsRazonSocial: '',
            dmsAnalistaID: '',
            dmsAnalista: [
            ],
            dmsCodigoSAP: '',
            dmsAprobacionID: '',
            dmsAprobacion: [
            ],
            Banco: '',
            CtaCte: '',
            ValeVista: '',
            valida: 0,
            validaMensaje:[],
            adModal: 0,
            adAccion: 0,
            adRut: 0,
            adRazonSocial: 0,
            adAnalistaID: 0,
            adCodigoSAP: 0,
            adAprobacionID: 0,
            adBanco: 0,
            adCtaCte: 0,
            adValeVista: 0,
            adProveedorId: ''
          }
      },

      computed: {
            formTitle () {
            return this.editedIndex === -1 ? 'Nuevo Proveedor' : 'Editando Proveedor'
            }
      },

      watch: {
            dialog (val) {
            val || this.close()
            }
      },

      created () {
            //this.initialize()
            this.listar();
            this.seleccionarAnalista();
            this.seleccionarAprobacion();
      },


      methods:{
        listar(){
            let me=this;
            axios.get('api/dmsProveedor/listar').then(function(response){
                console.log(response);
                me.dmsProveedor = response.data;
            }).catch(function(error){
                console.log(error);
            })
        },
        seleccionarAnalista(){
            let me=this;
            var AnalistaArreglo = [];
            axios.get('api/dmsAnalista/seleccionar').then(function(response){
                //console.log(response);
                AnalistaArreglo = response.data;
                AnalistaArreglo.map(function(x){
                    //var email = x.Email;
                    //var dmsanalistaid = x.dmsAnalistaID;

                    //alert("seleccionar analista..........."+ dmsanalistaid);                    

                    me.dmsAnalista.push({
                        text: x.email, value: x.dmsAnalistaID
                    })
                });

            }).catch(function(error){
                console.log(error);
            })
        },
        seleccionarAprobacion(){
            let me=this;
            var AprobacionArreglo = [];
            axios.get('api/dmsAprobacion/seleccionar').then(function(response){
                //console.log(response);
                AprobacionArreglo = response.data;
                AprobacionArreglo.map(function(x){
                    me.dmsAprobacion.push({
                        text: x.dmsAprobacionName, value: x.dmsAprobacionID
                    })
                });                
                //me.dmsAprobacion = response.data;
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
            this.dmsProveedorID = item.dmsProveedorID;
            this.dmsRut= item.dmsRut;
            this.dmsRazonSocial = item.dmsRazonSocial;
            this.dmsAnalistaID = item.dmsAnalistaID;
            this.dmsCodigoSAP = item.dmsCodigoSAP;
            this.dmsAprobacionID = item.dmsAprobacionID;
            this.Banco = item.Banco;
            this.CtaCte = item.CtaCte;
            this.ValeVista = item.ValeVista;
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
            this.dmsProveedorID="";
            this.dmsRut="";
            this.dmsRazonSocial="";
            this.dmsAnalistaID="";
            this.dmsCodigoSAP="";
            this.dmsAprobacionID="";
            this.Banco="";
            this.CtaCte="";
            this.ValeVista="";
            this.editedIndex = -1;
        },
        grabar () {
            if (this.validar())
                return;

            if (this.editedIndex > -1) {
                // Codigo para editar
                let me=this;
                axios.put('api/dmsProveedor/Actualizar',{
                    'DMSProveedorID': me.dmsProveedorID,
                    'DMSRut': me.dmsRut,
                    'DMSRazonSocial': me.dmsRazonSocial,
                    'DMSAnalistaID': me.dmsAnalistaID,
                    'DMSCodigoSAP': me.dmsCodigoSAP,
                    'DMSAprobacionID': me.dmsAprobacionID,
                    'Banco': me.Banco,
                    'CtaCte': me.CtaCte,
                    'ValeVista': me.ValeVista
                }).then(function(response){
                    me.close();
                    me.listar();
                    me.limpiar();                        
                }).catch(function(error){
                    console.log(error);
                });                       
            } else {
                // Codigo para grabar
                     var rut = this.dmsRut;
                     var razonsocial = this.dmsRazonSocial;
                     var analistaid = this.dmsAnalistaID;
                    //  var codigosap = this.dmsCodigoSAP;
                     var aprobacionid = this.dmsAprobacionID;
                     var banco = this.Banco;
                     var ctacte = this.CtaCte;
                     var valevista = this.ValeVista;

                    // var aprobador1a = this.aprobador1;

                     //alert("crea registro proveedor...........");

                    // alert("rut -> " + rut);
                    // alert("razonsocial -> " + razonsocial);
                    // alert("analistaid -> " + analistaid);
                    // alert("codigosap -> " + codigosap);
                    // alert("aprobacionid -> " + aprobacionid);
                    // alert("banco -> " + banco);
                    // alert("ctacte -> " + ctacte);
                    // alert("valevista -> " + valevista);

                    //alert("me.aprobador1 -> " + aprobador1a);

                    let me=this;
                    axios.post('api/dmsProveedor/Crear',{
                            'DMSRut': me.dmsRut,
                            'DMSRazonSocial': me.dmsRazonSocial,
                            'DMSAnalistaID': me.dmsAnalistaID,
                            'DMSCodigoSAP': me.dmsCodigoSAP,
                            'DMSAprobacionID': me.dmsAprobacionID,
                            'Banco': me.Banco,
                            'CtaCte': me.CtaCte,
                            'ValeVista': me.ValeVista
                    // axios.post('api/dmsAprobacion/Crear',{
                    //     'DMSAprobacionName': me.dmsRazonSocial,
                    //     'Aprobador1': me.dmsCodigoSAP,
                    //     'Aprobador2': me.dmsRut,
                    //     'Aprobador3': me.dmsRazonSocial              
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
            
            if(this.dmsRazonSocial.length < 5 || this.dmsRazonSocial.length > 30){
                this.validaMensaje.push("El nombre de la Razon Social debe tener mas de 5 caracteres y menos de 30 caracteres");
            }
            if(this.validaMensaje.length)
               this.valida=1;
            
            return this.valida;
        },
        
        activarDesactivarMostrar(accion,item){
            this.adModal = 1;

            this.dmsRut= item.dmsRut;
            this.dmsRazonSocial = item.dmsRazonSocial;
            this.dmsAnalistaID = item.dmsAnalistaID;
            this.dmsCodigoSAP = item.dmsCodigoSAP;
            this.dmsAprobacionID = item.dmsAprobacionID;
            this.Banco = item.Banco;
            this.CtaCte = item.CtaCte;
            this.ValeVista = item.ValeVista;
            this.adProveedorId = item.dmsProveedorID;

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
             var proveedorid = this.adProveedorId;

             //alert("ingreso en activar registro...");
             //alert("proveedorid -> "+ proveedorid);
    

            axios.put('api/dmsProveedor/Activar/' + this.adProveedorId ,{}).then(function(response){
                me.adModal=0;
                me.adAccion=0;
                me.dmsRut="";
                me.dmsRazonSocial="";
                me.dmsAnalistaID="";
                me.dmsCodigoSAP="";
                me.dmsAprobacionID="";
                me.Banco="";
                me.CtaCte="";
                me.ValeVista="";
                me.listar();
            }).catch(function(error){
                console.log(error);
            }); 
        },
        
        desactivar(){
            let me=this;
             var proveedorid = this.adProveedorId;

             //alert("ingreso en desactivar registro...");
             //alert("proveedorid -> "+ proveedorid);

            axios.put('api/dmsProveedor/Desactivar/' + this.adProveedorId ,{}).then(function(response){
                me.adModal=0;
                me.adAccion=0;
                me.dmsRut="";
                me.dmsRazonSocial="";
                me.dmsAnalistaID="";
                me.dmsCodigoSAP="";
                me.dmsAprobacionID="";
                me.Banco="";
                me.CtaCte="";
                me.ValeVista="";
                me.listar();
            }).catch(function(error){
                console.log(error);
            });
        }

      } 
    }
</script>

