import {defineStore} from "pinia";
import type {ProductInterface} from "../interfaces/interface.ts";

export const useProductStore = defineStore("productStore", {
    state: () => ({
        products: [
            {
                id: "1",
                title : "Bombardillo Crocodillo",
                price :20,
                description:"lelolololo",
                image:"https://images.steamusercontent.com/ugc/9674884067838145/789A9174306873050F28CA6EAE7690472DE15AEE/?imw=512&imh=496&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
            },
            {
                id : "2",
                title : "Brr Brr Patapim",
                price :25,
                description:"lolololo",
                image:"https://tiermaker.com/images/media/template_images/2024/18003943/italian-brainrot-animals-18003943/images-27.png"
            },
            {
                id : "3",
                title : "Tralalero Tralala",
                price :30,
                description:"porqoli e porqola",
                image:"https://source.boomplaymusic.com/group10/M00/02/16/2c22f2b991e246c4a6abd8cad53a32feH3000W3000_320_320.jpg"
            },
            {
                id : "4",
                title : "Lirili Larila",
                price :23,
                description:"trololololo",
                image:"https://pbs.twimg.com/amplify_video_thumb/1899960897537249280/img/PdcoZGTJwL90u46I.jpg"
            },
        ]
    }),
    actions : {
        addProduct(product : ProductInterface){
            this.products.unshift(product);
        },
        deleteProduct(id : string){
            this.products = this.products.filter(product => product.id != id);
        },
        changeProduct(id : string,title : string, description : string, price : number, imageURL : string){
            const currenProduct = this.products.filter(product => product.id == id)[0];

            currenProduct.title = title;
            currenProduct.description = description;
            currenProduct.price = price;
            currenProduct.image = imageURL;

        }
    }
})