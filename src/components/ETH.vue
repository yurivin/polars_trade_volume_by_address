<template>
  <div>
    <Loader v-if="loader"/>

  <table v-else  style="margin: 0 auto"  border="1" cellpadding="0" cellspacing="0"  id="table-1">
    <tr>
      <td width="100%">TOP POL in ETH</td>
    </tr>
    <tr>
      <td width="100%">
        <table border="1" cellpadding="0" cellspacing="0" width="100%" id="table-2">
          <tr >
            <td width="20%" valign="top">
              №
            </td>
            <td width="20%" valign="top">
              User Address
            </td>
            <td  width="50%" valign="top">
              Balance
            </td>
          </tr>
          <tr  v-for="(item, i) of address" :key="item">
            <td v-if="i<10">{{i +1}}.</td>
            <td v-if="i<10" width="20%" valign="top">
              <ul >
                <li class="address" name="address2" style="margin-right: 40px">{{item}}</li>

              </ul>

            </td>
            <td v-if="i<10" width="50%" valign="top">
              <ul  >
                <li style="margin-right: 40px">{{sortPol.get(item)}}</li>

              </ul>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  </div>
</template>

<script>
import Loader from "./Loader";
import fetch from 'node-fetch';

export default {
  name: "ETH",
  components:{
    Loader
  },
  data(){
    return{
      loader: true,
      arrayValues: [],
      addresses: [],
      address: [],
      pol: new Map(),
      sortPol: new Map(),
      url: "https://graphql.bitquery.io/",
    }
  },
  beforeMount() {

  },
  mounted() {
    this.takeAllPOL()
  },
  methods : {

    async takeAllPOL(){
      console.log(212223231232312323231232)
      const query = `
 {
  ethereum(network: ethereum) {
    arguments(
      smartContractAddress: {is: "0xc17fbe1d709dDf6C0B6665Dd0591046815AC7554"}
    ) {
      caller {
        address
      }
    }
  }
}
`;
      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "BQYKrkmtyqXiAXk4Qm2YfyvwQpc2rAQp"
        },
        body: JSON.stringify({
          query
        })
      }
      await fetch(this.url, opts)
          .then((response) => {
            return response.json();
          })
          .then((arr) => {
            for (let i = 0; i < arr.data.ethereum.arguments.length; i++) {
              this.addresses.push(arr.data.ethereum.arguments[i].caller.address)
            }


          });
      console.log(this.addresses);

      // console.log(addresses.join('","'));
      this.addresses = this.addresses.join('","')
      // console.log(addresses[0])
      await this.takePOL()
      this.loader = false
      return 'END'
    },
    async takePOL(){

      console.log(23456788)
      console.log(this.addresses)
      const query = `
    query ($addresses: [String!] = ["${this.addresses}"])
{
 ethereum(network: ethereum) {
    address(
      address: {in: $addresses}
    ) {
      balances(currency: {in: ["0xc17fbe1d709dDf6C0B6665Dd0591046815AC7554"]}) {
        currency {
          symbol
        }
        value
      }
      address
    }
  }
 }
    `;
      const optss = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "BQYKrkmtyqXiAXk4Qm2YfyvwQpc2rAQp"
        },
        body: JSON.stringify({
          query
        })
      };
      try {

        await fetch("https://graphql.bitquery.io/", optss)
            .then((response) => {
              return response.json();
            })
            .then((arr) => {
              console.log(arr.data.ethereum)
              for (let i = 0; i < arr.data.ethereum?.address?.length; i++) {
                if (arr.data.ethereum.address[i].balances[0] !== undefined && arr.data.ethereum.address !== 0) {
                  if (arr.data.ethereum.address[i].balances[0].value > 0) {
                    this.pol.set(arr.data.ethereum.address[i].address, arr.data.ethereum.address[i].balances[0].value)
                  }
                }
              }
              this.sortPol = new Map([...this.pol.entries()].sort((a, b) => b[1] - a[1]));
              let addre = []
              addre.push(this.sortPol.keys())
              this.address = addre[0]
              this.arrayValues = [...this.sortPol.values()]
              console.log(this.arrayValues.slice(0, 10))
            });
      } catch (e){
        console.log(e)
      }
      console.log(this.arrayValues.slice(0,10))


    },


  },
}

</script>

<style scoped>
li{
  list-style: none;
}
</style>