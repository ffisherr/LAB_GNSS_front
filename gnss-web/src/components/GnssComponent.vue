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


    export default {
        components: {
            Vuetable
        },
        name: "GnssComponent",
        data() {
            return {
                apiUrl: 'http://lab-gnss.bmstu.ru/api/files/',
                date: null
            };
        },
        methods: {
            onCellClicked(data) {
                this.date = data.data;
                if (this.date.year && !this.date.month) {
                    this.$refs.vuetable.apiUrl = this.apiUrl + this.date.year + '/months/';
                    this.$refs.vuetable.fields = ['year', 'month'];
                } else if (this.date.year && this.date.month && !this.date.day) {
                    this.$refs.vuetable.apiUrl = this.apiUrl + this.date.year + '/' + this.date.month + "/days/";
                    this.$refs.vuetable.fields = ['year', 'month', 'day'];
                } else if (this.date.year && this.date.month && this.date.day) {
                    this.$refs.vuetable.apiUrl = this.apiUrl + this.date.year + '/' + this.date.month + "/" + this.date.day + "/";
                    this.$refs.vuetable.fields = ['id', 'name', 'year', 'month', 'day'];
                }
                this.$refs.vuetable.refresh();
            },
            onBtnClicked( ) {
                console.log("Clicked");
                if (this.date.year && this.date.month && this.date.day) {
                    this.date.day = null;
                    this.$refs.vuetable.apiUrl = this.apiUrl + this.date.year + '/' + this.date.month + "/days/";
                    this.$refs.vuetable.fields = ['year', 'month', 'day'];
                } else if (this.date.year && this.date.month && !this.date.day) {
                    this.date.day = null;
                    this.date.month = null
                    this.$refs.vuetable.apiUrl = this.apiUrl + this.date.year + '/months/';
                    this.$refs.vuetable.fields = ['year', 'month'];
                } else if (this.date.year && !this.date.month && !this.date.day) {
                    this.date.day = null;
                    this.date.month = null
                    this.date.year = null;
                    this.$refs.vuetable.apiUrl = this.apiUrl + '/years/';
                    this.$refs.vuetable.fields = ['year'];
                }
                this.$refs.vuetable.refresh();

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