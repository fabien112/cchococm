<template>
  <main class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center g-0 min-vh-100">
      <div class="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
        <!-- Card -->
        <div class="card smooth-shadow-md">
          <!-- Card body -->
          <div class="card-body p-6">
            <div class="mb-4">
              <!-- <a href="../index.html"><img src="../assets/images/brand/logo/logo-2.svg" class="mb-2 text-inverse" alt="Image"></a> -->
              <h2 class="mb-6" style="color: #41160a">CHOCOCAM</h2>
            </div>
            <!-- Form -->

            <div class="mb-3" v-if="state == false">
              <label for="email" class="form-label">Email ou telephone</label>
              <input
                type="email"
                id="email"
                class="form-control"
                name="email"
                v-model="forms.login"
                required=""
              />
            </div>
            <!-- Password -->
            <div class="mb-3" v-if="state == true">
              <label for="password" class="form-label">Mot de passe </label>
              <input
                type="password"
                id="password"
                class="form-control"
                v-model="forms.password"
                name="password"
                required=""
              />
            </div>

            <div class="mb-9" v-if="state == false">
              <input
                style="background-color: #41160a"
                type="button"
                @click="login"
                class="btn text-white"
                name="password"
                value="S'authentifier"
              />
            </div>

            <div class="mb-9" v-if="state == true">
              <input
                style="background-color: #41160a"
                type="button"
                @click="login2"
                class="btn text-white"
                name="password"
                value="Se connecter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "HelloWorld",

  data() {
    return {
      forms: {
        login: "",
        password: "",
      },
      users: [],
      state: false,
      password: "",
    };
  },
  props: {
    msg: String,
  },
  methods: {
    login2() {
      console.log(this.password);
      if (this.password == this.forms.password) {
        this.s("Connexion OK ");

        localStorage.setItem("users", JSON.stringify(this.users.stUser));
        window.location.href = "dashboard";
      } else {
        this.e("Mot de passe incorrect");
      }
    },
    async login() {
      if (this.forms.login == "") {
        this.e(" Saissir votre Email ou  telephone ");
      } else {
        this.axios
          .get(
            process.env.VUE_APP_URL_API + "user/authUser",
            { params: { query: this.forms.login } },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.status == 200) {
              this.users = res.data;
              this.s("Compte trouvé");
              this.state = true;
              this.password = this.users.stUser.Password;
            } else {
              this.e("Compte introuvable");
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    },
  },
};
</script>
