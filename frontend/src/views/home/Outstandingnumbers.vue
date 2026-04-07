<template>
  <div>
    <section
      class="py-16 dark:bg-red-800"
      style="
        background-image: url('background-image');
      "
    >
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-white mb-12">
          Tại sao chọn chúng tôi?
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            v-scroll-reveal="{ delay: 200 }"
            class="bg-white rounded-lg p-6 transform hover:-translate-y-1 transition-transform duration-300"
          >
            <p class="text-gray-600 text-sm mb-2">{{ stat.label }}</p>
            <p class="text-red-600 text-4xl font-bold">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Đối tác tuyển dụng</h2>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8"
        >
          <div
            v-for="(partner, index) in partners"
            :key="index"
            class="p-4 flex items-center justify-center hover:opacity-75 transition-opacity duration-300"
          >
            <img
              loading="lazy"
              :src="partner.logo"
              :alt="partner.name"
              class="max-h-12 w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const stats = ref([
  {
    label: "Số năm kinh nghiệm",
    value: "10+",
  },
  {
    label: "Khách hàng quốc tế",
    value: "500+",
  },
  {
    label: "Dự án thành công",
    value: "1000+",
  },
  {
    label: "Văn phòng và chi nhánh",
    value: "10",
  },
  {
    label: "Top công ty Công nghệ tại Việt Nam",
    value: "Top 3",
  },
  {
    label: "Tỷ lệ khách hàng hài lòng",
    value: "97%",
  },
]);

const partners = ref([
  {
    name: "U.S.M.Holdings",
    logo: "https://s3-alpha-sig.figma.com/img/ba9b/90af/a95d4df69f56c7044cceaf8db38c3401?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D88P86RbdMYaVP46lvSf7i7Ogm4KySN7VA5yWdynjohfyZ5L6Ha1oOPTMlebqalR3qfEVy9H~PJaFG-WlIejGrn1K-smQ6TXahIR9i1QJEa2zb1~0kjqC0e-PedF7Hmf6P5NxmkFjdpgYZsTqSIt9EBsGN7TN5XeVytZB6Hm-RxwqrMrMvQfJWoOoHOYte-fl5YqU9vJeZTjYVgiEK8kjb095ULJ30t6QBmJ3joJc29DpIaEaLDwMubSMYH8Q6FFkc9W3Sz2Nq8aUsI8s~WY-l3hwXntQMURJaZ2RtxsjRFzhFAVLNYt3JiTLolkojNHSHhphxh-n0e2QLpH2GFJ4A__",
  },
  {
    name: "Studio NE63",
    logo: "https://s3-alpha-sig.figma.com/img/99c1/4e9b/eaedef77670568d349ccd38810aca795?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oDGi11vkCOYFeUtbmvTNDPwpyLxw8rJ9nyepPjYzoqss11Cj1nyO0lEnYxKpHg5qk-vJDUyXYZxtfAV6qaNt28nxzCtJr1oVyeXrxM-O32azxe-ZLB9Wc~2i0LctKgXdC5E0JeWky3FVfoPXzdcSsfZhqUjzIM2VWjliLpv0CaIDDlUZxNL21X3EadUpxsCc3QrT-eYlebVmz1Dlz7QdSf0FwU6bMyKYhQufgfdWK5ny69TLTrIHSY6bO6dvl8L19cNsA63YH4zRDwirx~0TCmeBGSHuBi5A2KGtl2dpxUKRM9WotcJrM-u7UjK61RtEq~ExcIyZDKY7Sq4pWfxmog__",
  },
  {
    name: "Sunloft",
    logo: "https://s3-alpha-sig.figma.com/img/62fb/741d/1029c644481ff6fdb28b781bad3418cc?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ji75aB~uBB9Ba7KuAut6gPZJJ4b-wEVG62m87gQGrZqDI2YDChJvtU77XmAjsTnXmW-UFZ~K-YT9t59bcIZ5FOdfLjn-M2Sq9u~wnK3XY7FJ1qldjTpKxjhT9T7sVFqWwMv7pBAWbC4JOYLJ2NoP1yenyglTyk-u2tT0zlVXX-FJyCdyE6b2lZhxfU-O3oa1DCA6R~IWulLJoOVE87WNBC896qSLppT4K6NHrWkvVePrTx-doc7XiSpVH6NwTVnjbs-Va6-FvFf-0lDX8KbwP7cBfIjmei5r06EdrK~UibGRiA~YVbkgdwHcnNqLeVxjWNXN~qIuaPhNzU9OgbxSBA__",
  },
  {
    name: "Systena",
    logo: "https://s3-alpha-sig.figma.com/img/e5a7/d176/dccc4222da4aeb757c467033bca0f3c6?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DsTjaDOLpuZ4kQPFSmEzZ04NcbbQdsIjulLzFiT57YVR-lKZUzKm1SwAYzVsqFwYK6dwvmLc2KjRB24Y4xtHPqigwoYAEmMICMgCrpTeqiUGgSUR0UwRDY9X5YkC1LZIHv6AGjq6smeJ3XPJdmBRh0rAGfcGko6vdmuybgD2uUH1NQznAAU1qc~RabKmkULvcv9-U~Z8CvOLjuBJ0udpVMHs4oQ3Vwm5VIDEFgGAQ1u4PgGQuwC6mB4ms0VRztZJvPnJaSVXgt2oPs65JFFlN~0b5o~CTAOlEkJoW7p~nMnsmgpq1o86Gg9SjDy53I3b8Iv0QWx9C6TGqXpnF9bNsQ__",
  },
  {
    name: "Fujikin",
    logo: "https://s3-alpha-sig.figma.com/img/9e4f/caef/a8d37d5d334caf03894ca555fa238a0f?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eQZGP95iIzhIiiND39iP1tA32dOdsvT-617f9TAA4CQUvrT799irt9wJtoj7p0MqtbyDUvWDdv21l83mY0ZkB-yzvtXG3-aXruEw4f6jqPcgMS5weedBirQnqUIY6b9HtJa25at~faE02bQAMvTq6sD5YHxJfaCl~xT9dyBpTOl3OzCB2XnK-ReyPIewiVSmkeiGS0Q9WlCul8u70Rf6bYn84f52Mol8gWbym-BzQCn826BidE0KYbQmHAJEVZjWg58znnRrGevF1fVkRL6WWpcEHoBqAoPYQdqEVvo1xEGzW8ZjyQC0ejgWSQqLHTOItDMNs73PCp9j6dIPCDBFSg__",
  },
  {
    name: "Cloud",
    logo: "https://s3-alpha-sig.figma.com/img/ba03/88f8/fae8c5e33ba402f5160697ee16424570?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iBYfXzKqJ0WvJ3GIfzg5jWUu46GJIw0P-9F0fkvpR8p36WJF2W0uemEUr36TbjOSNLiDJD~vwOooOKAzQsq4hKTjaUUoUzwjhTYcBu7CFTJxFaoJLxioKBa3QJUytFLbb00YZitvZ9R2EJNfQa08bARAp2N8LmlJL8Rq5nVnt3U2xjip0IbrSyh8HQhTBSGUppVoMV1ObA~v5NrOrMdK28FIC~KxyNPpd-qqwWwsqjwTr4tris~k6A02sJk5syR-j6SE1domn2Qo3DtA3lEqiRBgbnqRSEJvLI~ZUNxNb3fTRdcPoMtOIaeP426FUuM1tDjgWks5Ca9WJ6QA9VYX3A__",
  },
]);
</script>

<style scoped></style>
