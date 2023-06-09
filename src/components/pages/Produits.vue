<template>
  <main id="main-wrapper" class="main-wrapper">
    <Header />
    <Navbar />

    <Modal v-model="modal" title="Nouvelle caissière">
      <div class="row">
        <div class="col-6 pt-3">
          <input type="text" class="form-control" v-model="forms.nom" placeholder="Nom" />
        </div>
        <div class="col-6 pt-3">
          <input type="text" v-model="forms.prenom" class="form-control" placeholder="Prénom" />
        </div>
        <div class="col-6 pt-3">
          <input type="text" class="form-control" v-model="forms.email" placeholder="Email" />
        </div>

        <div class="col-6 pt-3">
          <input type="text" class="form-control" v-model="forms.telephone" placeholder="Téléphone" />
        </div>
        <div class="col-6 pt-3">
          <input type="text" class="form-control" v-model="forms.lieu" placeholder="Lieux de résidence" />
        </div>

        <div class="col-6 pt-3">
          <input type="password" class="form-control" v-model="forms.password" placeholder="Mot de passe" />
        </div>

        <div class="col-12 pt-3">
          <Upload multiple type="drag" :action="urlFile" :on-error="handleError" :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize" :format="['jpg', 'jpeg', 'png']" :max-size="2048"
            :on-success="handleSuccess">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #624bff"></Icon>
              <p>Ajouter une photo</p>
            </div>
          </Upload>
        </div>
      </div>
      <template #footer>
        <Button class="bg-primary text-white" size="large" long @click="save">Enregister</Button>
      </template>
    </Modal>

    <Modal v-model="modal1" title="Modifier">
      <div class="row">
        <div class="col-6 pt-3">
          <label class="m-3" for="">Nom</label>
          <input type="text" class="form-control" v-model="formsEdit.nom" placeholder="Nom" />
        </div>

        <div class="col-6 pt-3">
          <label class="m-3" for="">Selectionner la categorie</label><br />

          <select class="form-control" v-model="formsEdit.categorie">
            <option v-for="(data, i) in posts3" :key="i" :value="data.id">
              {{ data.nom }}
            </option>
          </select>
        </div>

        <div class="col-12 pt-3">
          <label class="m-3" for="">Associer une caissiere </label><br />
          <select class="form-control" v-model="formsEdit.idNew">
            <option v-for="(data, i) in posts2" :key="i" :value="data.id">
              {{ data.nom }} {{ data.prenom }}
            </option>
          </select>
        </div>
      </div>
      <template #footer>
        <Button class="bg-primary text-white" size="large" long @click="update">Modifier</Button>
      </template>
    </Modal>

    <Modal v-model="modal2" title="Attention">
      <div class="row">
        <p>Vous confimez la suppression ?</p>
      </div>

      <template #footer>
        <Button class="bg-danger text-white" size="large" long @click="delate">Supprimer</Button>
      </template>
    </Modal>

    <!-- Page content -->
    <div id="app-content">
      <!-- Container fluid -->

      <div class="app-content-area">
        <div class="pt-10 pb-21 mt-n6 mx-n4"></div>
        <div class="container-fluid mt-n22">
          <h2 style="color: #41160a">Liste des produits </h2>
          <br />

          <div class="row">
            <div class="row pt-8">
              <div class="col-xl-12 col-12 mb-5">
                <!-- card  -->
                <div class="card">
                  <div class="card-body">
                    <div class="table-responsive table-card">
                      <table class="table text-nowrap mb-0 table-centered table-hover">
                        <thead style="background-color: #41160a;">
                          <tr>

                            <th style="color: white">Libelle du produit </th>

                            <th style="color: white"> Famille </th>


                            <th style="color: white"> Compagnie </th>

                            <th style="color: white"> Qte en stcok </th>

                            <th style="color: white"> Prix public </th>

                            <th style="color: white"> Prix de stock </th>

                            <th style="color: white"> Prix Tricycle </th>

                            <th style="color: white"> Date de modification </th>

                            <th style="color: white"> Description </th>






                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(data, i) in listes.tabListproduit" :key="i">
                            <td>{{ data.LibelleProduit }}</td>
                            <td>{{ data.Famille }}</td>

                            <td>{{ data.compagnie }}</td>

                            <td>{{ data.Qtestock }}</td>

                            <td>{{ data.PrixPublicConseille }}</td>

                            <td>{{ data.Prixdesstock }}</td>

                            <td>{{ data.Prixtricycle }}</td>

                            <td>
                              <span class="badge badge-danger-soft">
                                {{
                                  (data.datemodification.split('')[0] + data.datemodification.split('')[1] +
                                    data.datemodification.split('')[2] +
                                    data.datemodification.split('')[3] + '-' + data.datemodification.split('')[4] +
                                    data.datemodification.split('')[5] + "-" + data.datemodification.split('')[6] +
                                    data.datemodification.split('')[7])

                                }}
                              </span>

                            </td>

                            <td>{{ data.synopsis }}</td>



                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
    this.users = JSON.parse(localStorage.getItem("users"));

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
