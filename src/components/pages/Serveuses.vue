<template>
  <main id="main-wrapper" class="main-wrapper">
    <Header />
    <Navbar />

    <Modal v-model="modal" title="Nouvelle serveuse">
      <div class="row">
        <div class="col-6 pt-3">
          <input
            type="text"
            class="form-control"
            v-model="forms.nom"
            placeholder="Nom"
          />
        </div>
        <div class="col-6 pt-3">
          <input
            type="text"
            v-model="forms.prenom"
            class="form-control"
            placeholder="Prénom"
          />
        </div>
        <div class="col-6 pt-3">
          <input
            type="text"
            class="form-control"
            v-model="forms.email"
            placeholder="Email"
          />
        </div>

        <div class="col-6 pt-3">
          <input
            type="text"
            class="form-control"
            v-model="forms.telephone"
            placeholder="Téléphone"
          />
        </div>
        <div class="col-6 pt-3">
          <input
            type="text"
            class="form-control"
            v-model="forms.lieu"
            placeholder="Lieux de résidence"
          />
        </div>

        <div class="col-6 pt-3">
          <input
            type="password"
            class="form-control"
            v-model="forms.password"
            placeholder="Mot de passe"
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
        <Button class="bg-primary text-white" size="large" long @click="save"
          >Enregister</Button
        >
      </template>
    </Modal>

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

    <Modal v-model="modal2" title="Attention">
      <div class="row">
        <p>Vous confimez la suppression ?</p>
      </div>

      <template #footer>
        <Button class="bg-danger text-white" size="large" long @click="delate"
          >Supprimer</Button
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
            <div class="col-10 pt-3">
              <!-- card  -->
              <div class="card mb-2">
                <!-- card body  -->
                <div class="card-body">
                  <div
                    class="row d-flex justify-content-between align-items-center"
                  >
                    <div
                      class="d-flex align-items-center col-lg-5 col-md-5 col-12 mb-4 mb-md-0"
                    >
                      <div class="ms-3">
                        <h2 class="mb-0 fs-5">
                          <a href="#!" class="text-inherit"
                            >TOUTES LES SERVEUSES
                          </a>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-2">
              <a @click="modal = true" style="color: #624bff; font-size: 60px">
                <Icon type="md-add-circle" />
              </a>
            </div>

            <div
              class="col-lg-4 col-12 p-5"
              v-for="(data, i) in posts"
              :key="i"
            >
              <!-- card -->
              <div class="card mb-5 rounded-3">
                <div>
                  <img
                    src="https://img.freepik.com/vecteurs-premium/fond-degrade-couleur-liquide-dans-tons-bleu-illustration-vectorielle_647322-252.jpg"
                    alt="Image"
                    class="img-fluid rounded-top"
                  />
                </div>
                <!-- avatar -->
                <div class="avatar avatar-xl mt-n7 ms-4">
                  <img
                    class="rounded-circle border-4 border-white-color-40"
                    :src="`${url}Photos/${data.photo}`"
                  />
                </div>
                <!-- card body -->
                <div class="card-body">
                  <!-- Title -->
                  <h4 class="mb-1">{{ data.nom }} {{ data.prenom }}</h4>
                  <p>
                    <span class="badge badge-success-soft">
                      {{ data.email }}
                    </span>
                  </p>
                  <p>
                    <span class="badge badge-primary-soft">
                      {{ data.lieu }}
                    </span>
                  </p>

                  <p>
                    <span class="badge badge-danger-soft">
                      {{ data.role }}
                    </span>
                  </p>
                  <div>
                    <br />
                    <!-- Dropdown -->
                    <div class="">
                      <a
                        @click="showModalEdit(data, i)"
                        class="btn btn-primary btn-sm m-2"
                        ><Icon type="md-create"
                      /></a>
                      <a
                        @click="showModal(data, i)"
                        class="btn btn-danger btn-sm"
                      >
                        <Icon type="md-trash" />
                      </a>
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
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        photo: "",
        lieu: "",
        password: "",
      },

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
      modal: false,
      modal1: false,
      modal2: false,
      item: "",
      i: -1,
    };
  },

  async mounted() {
    const response2 = await this.callApi(
      "post",
      process.env.VUE_APP_URL_API + "api/getserveuses"
    );

    this.posts = response2.data;
  },

  methods: {
    async save() {
      if (this.forms.nom == "") {
        this.e("Saisir votre nom");
      } else if (this.forms.prenom == "") {
        this.e("Saisir votre prenom");
      } else if (this.forms.email == "") {
        this.e("Le champs email est vide");
      } else if (this.forms.telephone == "") {
        this.e("Le champs telephone est vide");
      } else if (this.forms.lieu == "") {
        this.e("Saisir le lieux de residence");
      } else if (this.forms.password == "") {
        this.e("Saisir un mot de passe");
      } else if (this.forms.photo == "") {
        this.e("Ajouter une photo");
      } else {
        this.$Spin.show();
        const response = await this.callApi(
          "post",
          process.env.VUE_APP_URL_API + "api/add-serveuse",
          this.forms
        );

        if (response.status === 200) {
          this.$Spin.hide();
          const response2 = await this.callApi(
            "post",
            process.env.VUE_APP_URL_API + "api/getserveuses"
          );

          this.forms.nom =
            this.forms.prenom =
            this.forms.email =
            this.forms.telephone =
            this.forms.photo =
            this.forms.password =
            this.forms.lieu =
              "";

          this.posts = response2.data;
          this.s(" Opération correctement éffectuée");

          this.modal = false;
        } else if (response.status == 500) {
          this.e("Email déja pris...");
          this.$Spin.hide();
        } else {
          this.e("Opération échouée");
          this.$Spin.hide();
        }
      }
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

    showModal(m, i) {
      this.modal2 = true;
      this.item = m;
      this.i = i;
    },

    async delate() {
      this.$Spin.show();
      const response3 = await this.callApi(
        "post",
        process.env.VUE_APP_URL_API + "api/delate-serveuse",
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
      } else if (this.formsEdit.prenom == "") {
        this.e("Saisir votre prenom");
      } else if (this.formsEdit.email == "") {
        this.e("Le champs email est vide");
      } else if (this.formsEdit.telephone == "") {
        this.e("Le champs telephone est vide");
      } else if (this.formsEdit.lieu == "") {
        this.e("Saisir le lieux de residence");
      } else if (this.formsEdit.password == "") {
        this.e("Saisir un mot de passe");
      } else {
        this.$Spin.show();
        const response = await this.callApi(
          "post",
          process.env.VUE_APP_URL_API + "api/update-serveuse",
          this.formsEdit
        );

        if (response.status === 200) {
          this.$Spin.hide();
          const response2 = await this.callApi(
            "post",
            process.env.VUE_APP_URL_API + "api/getserveuses"
          );

          this.formsEdit.nom =
            this.formsEdit.prenom =
            this.formsEdit.email =
            this.formsEdit.telephone =
            this.formsEdit.password =
            this.formsEdit.lieu =
              "";

          this.posts = response2.data;
          this.s(" Opération correctement éffectuée");

          this.modal1 = false;
        } else {
          this.e(
            "Opération échouée. Vérifier que cette adresse email est correct ou n'est pas déjà prise"
          );
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
