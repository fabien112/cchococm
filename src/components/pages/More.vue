<template>
    <main id="main-wrapper" class="main-wrapper">
        <Header />
        <Navbar />


        <!-- Page content -->
        <div id="app-content">
            <!-- Container fluid -->

            <div class="app-content-area">
                <div class="pt-10 pb-21 mt-n6 mx-n4"></div>
                <div class="container-fluid mt-n22">
                    <h2 style="color: #41160a">Details du Pdv </h2>
                    <br />

                    <div class="row">
                        <div class="row pt-8">
                            <div class="col-6">
                                Nom du point de vente

                            </div>

                            <div class="col-6">

                                {{ users.sNomPDV }}
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="row pt-8">
                            <div class="col-6">
                                Ville

                            </div>

                            <div class="col-6">

                                {{ users.sVille }}
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="row pt-8">
                            <div class="col-6">
                                Region

                            </div>

                            <div class="col-6">

                                {{ users.sRegion }}
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="row pt-8">
                            <div class="col-6">
                                Nom du user

                            </div>

                            <div class="col-6">

                                {{ users.sNomuser }}
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="row pt-8">
                            <div class="col-6">
                                Nom Agent

                            </div>

                            <div class="col-6">

                                {{ users.sGerantNom }}
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="row pt-8">
                            <div class="col-6">
                                Tel Agent

                            </div>

                            <div class="col-6">

                                {{ users.sTelGerant }}
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="row pt-8">
                            <div class="col-6">
                                Repere

                            </div>

                            <div class="col-6">

                                {{ users.sRepere }}
                            </div>
                        </div>
                    </div>

                    <hr>


                    <div class="row">
                        <div class="row pt-8">
                            <div class="col-6">
                                Setceur activité

                            </div>

                            <div class="col-6">

                                {{ users.segment }}
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="row pt-8">
                            <div class="col-6">
                                Segment marché

                            </div>

                            <div class="col-6">

                                {{ users.canaldistribution }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import Header from "../Header";
import Navbar from "../Navbar";

export default {
    name: "HelloWorld",
    components: {
        Header,
        Navbar,
    },

    data() {
        return {
            forms: {
                famille: "",
                libbelproduit: "",
                rBonrmemin: 0,
                rBornemax: 0,

            },
            datedebut: "",
            datefin: "",
            listes: {},

            formsEdit: {
                nom: "",
                categorie: "",
                idNew: "",
            },
            urlFile: process.env.VUE_APP_URL_API + "api/upload",
            url: process.env.VUE_APP_URL_API,
            posts: "",
            posts5: {
                sumtotal: 0,
                sumcaisseunique: 0,
            },
            posts2: "",
            modal: false,
            modal1: false,
            modal2: false,
            item: "",
            i: -1,
            users: "",
        };
    },

    async mounted() {
        this.users = JSON.parse(localStorage.getItem("users2"));

        // this.forms.region = this.users.sRegion;
        // this.forms.ville = this.users.sVille;
        this.forms.uuid = this.users.uiid;
        // this.forms.usercode = this.users.sTel;
        // 
        this.axios
            .post(
                process.env.VUE_APP_URL_API + "products/catalog",
                this.forms,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {

                this.$Spin.show();
                if (res.status == 200) {
                    this.listes = res.data;
                    this.$Spin.hide();

                } else {
                    this.$Spin.hide();
                }
            })
            .catch((err) => {
                console.log(err.response);
            });

        console.log(this.users);
    },

    methods: {

        showModalEdit(m, i) {
            this.i = i;
            console.log(m.categorie);
            this.modal1 = true;
            this.item = m;
            this.formsEdit.id = m.id;
            this.formsEdit.nom = m.nom;
            this.formsEdit.categorie = m.standard;
        },

        showModal(m) {
            this.modal2 = true;
            this.item = m;
        },

        async delate() {
            this.$Spin.show();
            const response3 = await this.callApi(
                "post",
                process.env.VUE_APP_URL_API + "api/delate-caisse",
                this.item
            );

            if (response3.status == 200) {
                this.$Spin.hide();
                this.s(" Opération correctement éffectuée");
                this.posts.splice(this.i, 1);
                this.modal2 = false;
            } else {
                this.e("Opération échouée");
            }
        },

        async update() {
            if (this.formsEdit.nom == "") {
                this.e("Saisir votre nom");
            } else if (this.formsEdit.categorie == "") {
                this.e("Choisir une categorie");
            } else if (this.formsEdit.idNew == "") {
                this.e("Associer une caissiere");
            } else {
                this.$Spin.show();
                const response = await this.callApi(
                    "post",
                    process.env.VUE_APP_URL_API + "api/update-caisse",
                    this.formsEdit
                );

                if (response.status === 200) {
                    this.$Spin.hide();
                    const response2 = await this.callApi(
                        "post",
                        process.env.VUE_APP_URL_API + "api/getcaisses"
                    );

                    this.posts = response2.data;
                    this.s(" Opération correctement éffectuée");

                    this.modal1 = false;
                    this.formsEdit.nom = this.formsEdit.categorie = "";
                } else {
                    this.formsEdit.nom = this.formsEdit.categorie = "";
                    this.modal1 = false;
                    this.e("Opération échouée");
                    this.$Spin.hide();
                }
            }
        },

        handleSuccess(res, file) {
            this.forms.photo = this.formsEdit.photo = res;
            this.s("Photo correctement ajouté.");
            console.log(res);
            console.log(file);
        },

        handleFormatError(file) {
            this.w("Selectionner un jpg  , png ou jpeg uniquement");
            console.log(file);
        },
        handleMaxSize(file) {
            this.w("Selctionner un fichier de moins de 2M.");
            console.log(file);
        },
    },
};
</script>

<style></style>
