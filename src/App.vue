<template>
  <div class="container">
    <DashboardHeader />

    <div class="dashboard">
      <main class="main-content">
        <aside class="sidebar">
          <DocumentSearch />
          <DocumentList />
        </aside>

        <section class="content-area">
          <DocumentViewer />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardHeader from '@/components/DashboardHeader.vue'
import DocumentSearch from '@/components/DocumentSearch.vue'
import DocumentList from '@/components/DocumentList.vue'
import DocumentViewer from '@/components/DocumentViewer.vue'
</script>

<style scoped>
.container {
  max-width: 1266px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard {
  background: #fdfdfd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 575px;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}

.main-content {
  display: flex;
  flex: 1;
  min-height: 0;
}

.sidebar {
  border-right: 1px solid #e0e0e0;
  padding: 27px 0 60px 0;
  display: flex;
  flex-direction: column;
  gap: 29px;
}

.content-area {
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .container {
    max-width: 100%;
    padding: 15px;
  }

  .sidebar {
    width: 300px;
  }
}

@media (max-width: 992px) {
  .sidebar {
    width: 280px;
    padding: 20px 15px 40px 15px;
  }

  .content-area {
    padding: 25px;
  }
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 20px;
    gap: 20px;
  }

  .content-area {
    padding: 20px;
    min-height: 400px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
  }

  .dashboard {
    margin-top: 10px;
    min-height: 500px;
  }

  .sidebar {
    padding: 15px;
    gap: 15px;
  }

  .content-area {
    padding: 15px;
  }
}

@media (max-width: 360px) {
  .container {
    padding: 5px;
  }

  .sidebar {
    padding: 10px;
  }

  .content-area {
    padding: 10px;
  }
}
</style>
