<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h1 class="card-title">Dashboard</h1>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="datePicker">Select Date</label>
          <input type="date" id="datePicker" class="form-control" v-model="date" @change="onDateChange" />
        </div>
        <div class="mt-4">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">Total Functional Schools</h5>
              <p class="card-text">{{ totalSchools }}</p>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">Schools On</h5>
              <p class="card-text">{{ onSchools }}</p>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">Schools Off</h5>
              <p class="card-text">{{ offSchools }}</p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Remaining</h5>
              <p class="card-text">{{ remainingSchools }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useSchoolStore } from '../store/useSchoolStore'

export default defineComponent({
  setup() {
    const store = useSchoolStore()
    const date = ref(new Date().toISOString().slice(0, 10))

    onMounted(async () => {
      await store.fetchSchools()
      await store.fetchFeedback(date.value)
    })

    const onDateChange = async () => {
      await store.fetchFeedback(date.value)
    }

    const totalSchools = computed(() => store.schools.filter(s => s.status === 'Functional').length)
    const onSchools = computed(() => store.feedback.filter(f => f.schoolStatus === 'On').length)
    const offSchools = computed(() => store.feedback.filter(f => f.schoolStatus === 'Off').length)
    const remainingSchools = computed(() => totalSchools.value - (onSchools.value + offSchools.value))

    return {
      date,
      onDateChange,
      totalSchools,
      onSchools,
      offSchools,
      remainingSchools
    }
  }
})
</script>
