<template>
  <main id="main-wrapper" class="main-wrapper">
    <Header />
    <NavbarServeuse />

    <Modal v-model="modal1" title="Modifier">
      <div class="row">
        <div class="col-6 pt-3">
          <input
            type="text"
            class="form-control"
            v-model="formsEdit.nom"
            placeholder="Nom"
          />
        </div>
        <div class="col-6 pt-3">
          <input
            type="text"
            v-model="formsEdit.prenom"
            class="form-control"
            placeholder="Prénom"
          />
        </div>
        <div class="col-6 pt-3">
          <input
            type="text"
            class="form-control"
            v-model="formsEdit.email"
            placeholder="Email"
          />
        </div>

        <div class="col-6 pt-3">
          <input
            type="text"
            class="form-control"
            v-model="formsEdit.telephone"
            placeholder="Téléphone"
          />
        </div>
        <div class="col-6 pt-3">
          <input
            type="text"
            class="form-control"
            v-model="formsEdit.lieu"
            placeholder="Lieux de résidence"
          />
        </div>

        <div class="col-6 pt-3">
          <input
            type="password"
            class="form-control"
            v-model="formsEdit.password"
            placeholder="Nouveau mot de passe"
          />
        </div>

        <div class="col-12 pt-3">
          <Upload
            multiple
            type="drag"
            :action="urlFile"
            :on-error="handleError"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="2048"
            :on-success="handleSuccess"
          >
            <div style="padding: 20px 0">
              <Icon
                type="ios-cloud-upload"
                size="52"
                style="color: #624bff"
              ></Icon>
              <p>Ajouter une photo</p>
            </div>
          </Upload>
        </div>
      </div>
      <template #footer>
        <Button class="bg-primary text-white" size="large" long @click="update"
          >Modifier</Button
        >
      </template>
    </Modal>

    <Modal v-model="modal2">
      <p class="text-center">Vous confirmez cette action ?</p>
      <template #footer>
        <Button class="bg-danger text-white" long @click="delate"
          >Confimer</Button
        >
      </template>
    </Modal>

    <!-- Page content -->
    <div id="app-content">
      <!-- Container fluid -->

      <div class="app-content-area">
        <div class="pt-10 pb-21 mt-n6 mx-n4"></div>
        <div class="container-fluid mt-n22">
          <div class="row">
            <div class="col-12 mb-5 pt-10">
              <!-- card  -->
              <div class="card">
                <!-- card header  -->
                <div
                  class="card-header bg-primary d-flex justify-content-between align-items-center"
                >
                  <h4 class="mb-0 text-white">Details de la commande</h4>
                </div>
                <!-- table  -->
                <div class="card-body">
                  <div class="table-responsive table-card">
                    <table
                      class="table text-nowrap mb-0 table-centered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Produits</th>
                          <th>Prix Unitaire</th>
                          <th>Quantite</th>
                          <th>Prix unitaire * Quantite</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(data, i) in commandes2" :key="i">
                          <td>
                            {{ data.produits.nom }}
                          </td>
                          <td>
                            <span class="badge badge-success-soft"
                              >{{ data.prix }} F
                            </span>
                          </td>
                          <td>
                            <span class="badge badge-danger-soft"
                              >{{ data.nombre }}
                            </span>
                          </td>

                          <td>
                            <span class="badge badge-primary-soft">
                              {{ data.nombre * data.prix }} F
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="col-4 pt-10">
              <div class="card">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestiae nisi ab nesciunt repudiandae rerum id eaque saepe
                earum veritatis? At, ea. Rerum eius totam, dicta inventore
                officia odit! Modi, debitis.
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import Header from "../../Header";
import NavbarServeuse from "../../NavbarServeuse";

export default {
  name: "HelloWorld",
  components: {
    Header,
    NavbarServeuse,
  },

  data() {
    return {
      forms: {
        id: "",
        caise: "",
      },

      caisse: "",

      formsEdit: {
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        photo: "",
        lieu: "",
        password: "",
      },

      urlFile: process.env.VUE_APP_URL_API + "api/upload",
      url: process.env.VUE_APP_URL_API,
      posts: "",
      posts3: "",
      postsserveuse: "",
      modal: false,
      val: true,
      modal1: false,
      modal2: false,
      commandes: "",
      commandes2: "",
      item: false,
      i: -1,
    };
  },
  computed: {},
  async mounted() {
    if (!localStorage.users) {
      this.$router.push("/");
    } else {
      this.commandes = JSON.parse(localStorage.getItem("details"));
      this.forms.id = this.commandes.id;
      this.forms.caisse = this.commandes.caisses_id;

      const response4 = await this.callApi(
        "post",
        process.env.VUE_APP_URL_API + "api/detail-vente",
        this.forms
      );

      this.$Spin.show();

      if (response4.status == 200) {
        // this.s(" Opération correctement éffectuée");

        this.commandes2 = response4.data;
        this.$Spin.hide();
      }
    }
  },

  methods: {
    showDetails(data) {
      this.$router.push("details-vente");
      console.log(data);
    },
    async show() {
      if (this.forms.jourd == "") {
        this.e("Vous devez choisir un jour obligatoirement de debut");
      } else if (this.forms.jourf == "") {
        this.e("Vous devez choisir un jour obligatoirement de fin");
      } else {
        this.$Spin.show();

        this.forms.caisse = this.caisse;

        const response4 = await this.callApi(
          "post",
          process.env.VUE_APP_URL_API + "api/show-vente",
          this.forms
        );

        if (response4.status == 200) {
          // this.s(" Opération correctement éffectuée");

          this.posts = response4.data;

          this.$Spin.hide();
        } else {
          this.e("Opération échouée");
          this.$Spin.hide();
        }

        console.log(response4);
      }
    },

    async showJour() {
      this.$Spin.show();

      this.forms.caisse = this.caisse;

      const response4 = await this.callApi(
        "post",
        process.env.VUE_APP_URL_API + "api/show-ventejour",
        this.forms
      );

      if (response4.status == 200) {
        // this.s(" Opération correctement éffectuée");

        this.posts = response4.data;

        this.$Spin.hide();
      } else {
        this.e("Opération échouée");
        this.$Spin.hide();
      }

      console.log(response4);
    },

    showModalEdit(m) {
      this.modal1 = true;
      this.item = m;
      this.formsEdit.id = m.id;
      this.formsEdit.nom = m.nom;
      this.formsEdit.prenom = m.prenom;
      this.formsEdit.email = m.email;
      this.formsEdit.telephone = m.telephone;
      this.formsEdit.lieu = m.lieu;
      this.formsEdit.oldImage = m.photo;
    },

    showModal(m) {
      this.modal2 = true;
      this.item = m;
    },

    async delate() {
      this.$Spin.show();
      const response3 = await this.callApi(
        "post",
        process.env.VUE_APP_URL_API + "api/delate-commande",
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
  },
};
</script>

<style></style>
