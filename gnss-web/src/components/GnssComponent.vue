<template>
    <div>
        <button v-on:click="onBtnClicked">
            Назад
        </button>
            <vuetable ref="vuetable"
                      api-url="http://lab-gnss.bmstu.ru/api/files/years/"
                      :fields="['year']"
                      data-path=""
                      pagination-path=""
                      @vuetable:cell-clicked="onCellClicked" />
    </div>
</template>

<script>
    import Vuetable from 'vuetable-2';
    import axios from 'axios';

    export default {
        components: {
            Vuetable
        },
        name: "GnssComponent",
        data() {
            return {
                apiUrl: 'http://lab-gnss.bmstu.ru/api/files/',
                date: null,
                step: 'chooseYear',
            };
        },
        methods: {
            onCellClicked(data) {
                if (this.step === 'downloadFile')  {
                    this.downloadFile(data.data.id, data.data.name);
                    return;
                }
                this.date = data.data;
                if (this.date.year && !this.date.month) {
                    this.$refs.vuetable.apiUrl = this.apiUrl + this.date.year + '/months/';
                    this.$refs.vuetable.fields = ['year', 'month'];
                    this.step = 'chooseMonth';
                } else if (this.date.year && this.date.month && !this.date.day) {
                    this.$refs.vuetable.apiUrl = this.apiUrl + this.date.year + '/' + this.date.month + "/days/";
                    this.$refs.vuetable.fields = ['year', 'month', 'day'];
                    this.step = 'chooseDay';
                } else if (this.date.year && this.date.month && this.date.day) {
                    this.$refs.vuetable.apiUrl = this.apiUrl + this.date.year + '/' + this.date.month + "/" + this.date.day + "/";
                    this.$refs.vuetable.fields = ['id', 'name', 'year', 'month', 'day'];
                    this.step = 'downloadFile';
                }
                this.$refs.vuetable.refresh();
            },
            onBtnClicked() {
                let fields = [];
                let link = this.apiUrl;
                if (this.date.year && this.date.month && this.date.day) {
                    this.step = 'chooseDay';
                    this.date.day = null;
                    link = this.apiUrl + this.date.year + '/' + this.date.month + "/days/";
                    fields = ['year', 'month', 'day'];
                } else if (this.date.year && this.date.month && !this.date.day) {
                    this.step = 'chooseMonth';
                    this.date.day = null;
                    this.date.month = null
                    link = this.apiUrl + this.date.year + '/months/';
                    fields = ['year', 'month'];
                } else if (this.date.year && !this.date.month && !this.date.day) {
                    this.step = 'chooseYear';
                    this.date.day = null;
                    this.date.month = null
                    this.date.year = null;
                    link = this.apiUrl + '/years/';
                    fields = ['year'];
                }
                this.$refs.vuetable.apiUrl = link;
                this.$refs.vuetable.fields = fields;
                this.$refs.vuetable.refresh();
            },
            downloadFile(fileId, fileName) {
                axios({
                    url: this.apiUrl + fileId + '/',
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    const fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', fileName);
                    document.body.appendChild(fileLink);
                    fileLink.click();
                });
            }
        }

    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }
</style>