<template>
    <main id="main-wrapper" class="main-wrapper">
        <!-- <Header /> -->
        <!-- <Navbar /> -->


        <!-- Page content -->
        <div id="app-content">
            <!-- Container fluid -->


            <GoogleMap api-key="AIzaSyBCZvqNX56pwbGvln7OkzC5T7Qf3ZX6YSY" style="width: 100%; height: 100%" :center="center"
                :zoom="15">
                <Marker :options="{ position: center }" />
            </GoogleMap>


        </div>
    </main>
</template>
<script>
//import Header from "../Header";
// import Navbar from "../Navbar";
import { GoogleMap, Marker } from "vue3-google-map";

// import { ref } from "vue";

export default {
    name: "HelloWorld",
    components: {


        //Header,
        // Navbar,
        GoogleMap,
        Marker

    },


    data() {
        return {
            users: "",
            center: "",
            center2: ""
        };
    },

    async mounted() {

        this.users = JSON.parse(localStorage.getItem("users2"));


        this.center = { lat: Number(this.users.rLatitude), lng: Number(this.users.rLongitude) };


        console.log(this.center);
    },

    methods: {


    },
};
</script>

<style></style>
