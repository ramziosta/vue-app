<script setup>
import {reactive} from "vue";
import axios from "axios";
import router from "../router/index.js";
import {useToast} from "vue-toastification";

const form = reactive({
  id:"",
  type: "Part-Time",
  name: "",
  description: "",
  salary: "",
  location: "",
  company: {
    name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  },
});

const toast = useToast();
const submitForm = async () => {
  console.log(form);
  const newData = {
    id: form.id,
    type: form.type,
    name: form.name,
    description: form.description,
    salary: form.salary,
    location: form.location,
    company: {
      name: form.company.name,
      description: form.company.description,
      contactEmail: form.company.contactEmail,
      contactPhone: form.company.contactPhone,
    },
  };
  try {
    const response = await axios.post("https://vue-app-backend.vercel.app/traders", newData);

    toast.success("Data added successfully!", {
      timeout: 3000, // 3 seconds
    });

    if (response.data?.id) {
      await router.push(`/data`);
      console.log("Navigation successful:", response.data.id);
    }

    console.log("Response:", response);
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Error adding data! Please try again.");
  }

};
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
          class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="submitForm">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Trader</h2>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
            >Job Type</label
            >
            <select v-model="form.type"
                    id="type"
                    name="type"
                    class="border rounded w-full py-2 px-3"

            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
            >Trader's ID</label
            >
            <input
                v-model="form.id"
                type="text"
                id="id"
                name="id"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="start with number 11"

            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
            >Trader's Name</label
            >
            <input
                v-model="form.name"
                type="text"
                id="name"
                name="name"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Ms Goldsmith"

            />
          </div>
          <div class="mb-4">
            <label
                for="description"
                class="block text-gray-700 font-bold mb-2"
            >Description</label
            >
            <textarea v-model="form.description"
                      id="description"
                      name="description"
                      class="border rounded w-full py-2 px-3"
                      rows="4"
                      placeholder="Crypto Expert"

            ></textarea>
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
            >Salary</label
            >
            <select v-model="form.salary"
                    id="salary"
                    name="salary"
                    class="border rounded w-full py-2 px-3"

            >
              <option value="Under $50K">under $50K</option>
              <option value="$50K - $60K">$50 - $60K</option>
              <option value="$60K - $70K">$60 - $70K</option>
              <option value="$70K - $80K">$70 - $80K</option>
              <option value="$80K - $90K">$80 - $90K</option>
              <option value="$90K - $100K">$90 - $100K</option>
              <option value="$100K - $125K">$100 - $125K</option>
              <option value="$125K - $150K">$125 - $150K</option>
              <option value="$150K - $175K">$150 - $175K</option>
              <option value="$175K - $200K">$175 - $200K</option>
              <option value="Over $200K">Over $200K</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">
              Location
            </label>
            <input v-model="form.location"
                   type="text"
                   id="location"
                   name="location"
                   class="border rounded w-full py-2 px-3 mb-2"
                   placeholder="Company Location"

            />
          </div>

          <h3 class="text-2xl mb-5">Company Info</h3>

          <div class="mb-4">
            <label for="company" class="block text-gray-700 font-bold mb-2"
            >Company Name</label
            >
            <input v-model="form.company.name"
                   type="text"
                   id="company"
                   name="company"
                   class="border rounded w-full py-2 px-3"
                   placeholder="Company Name"

            />
          </div>

          <div class="mb-4">
            <label
                for="company_description"
                class="block text-gray-700 font-bold mb-2"
            >Company Description</label
            >
            <textarea v-model="form.company.description"
                      id="company_description"
                      name="company_description"
                      class="border rounded w-full py-2 px-3"
                      rows="4"
                      placeholder="What does your company do?"

            ></textarea>
          </div>

          <div class="mb-4">
            <label
                for="contact_email"
                class="block text-gray-700 font-bold mb-2"
            >Contact Email</label
            >
            <input v-model="form.company.contactEmail"
                   type="email"
                   id="contact_email"
                   name="contact_email"
                   class="border rounded w-full py-2 px-3"
                   placeholder="Email address for trader"

            />
          </div>
          <div class="mb-4">
            <label
                for="contact_phone"
                class="block text-gray-700 font-bold mb-2"
            >Contact Phone</label
            >
            <input v-model="form.company.contactPhone"
                   type="tel"
                   id="contact_phone"
                   name="contact_phone"
                   class="border rounded w-full py-2 px-3"
                   placeholder="Phone for trader"

            />
          </div>

          <div>
            <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
            >
              Add Trader
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>