<template>
  <div>
    <Loader v-if="loader"/>
  <table v-else style="margin: 0 auto" border="1" cellpadding="0" cellspacing="0" >
    <tr>
      <td width="100%">TOP bPOL in BSC</td>
    </tr>
    <tr>
      <td width="100%">
        <table border="1" cellpadding="0" cellspacing="0" width="100%" >
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
          <tr v-for="(item, i) of bPOLaddress" :key="item">
            <td v-if="i<10">{{i +1}}.</td>
            <td v-if="i<10" width="20%" valign="top">
              <ul >

                <li style="margin-right: 40px"> {{item}}</li>

              </ul>

            </td>
            <td v-if="i<10" width="50%" valign="top">
              <ul  >
                <li style="margin-right: 40px">{{ sortBPol.get(item) }}</li>

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

export default {
  name: "BCS",
  components:{
    Loader
  },
  data(){
    return{
      loader: true,
      bPOLaddresses: [],
      bPOLaddressesPart1: [],
      bPOLaddressesPart2: [],
      bPOLaddressesPart3: [],
      bPOLaddressesPart4: [],
      bPOLaddress: [],
      bPOLaddressPart1: [],
      bPOLaddressPart2: [],
      bPOLaddressPart3: [],
      bPOLaddressPart4: [],
      sortBPol: new Map(),
      sortBPolPart1: new Map(),
      sortBPolPart2: new Map(),
      sortBPolPart3: new Map(),
      url: "https://graphql.bitquery.io/",
    }
  },
  beforeMount() {
    this.takeAllBPOL()
    
  },
  mounted() {
    
  },
  methods : {
    change(){
      this.bool = !this.bool
      if (this.bool === true){

        // this.takeAllPOL()
        window.location.reload()
      } else {
        // this.takeAllBPOL()
        // window.location.reload()
      }
    },
    async takeAllBPOL(){
      const query = `
 {
  ethereum(network: bsc) {
    arguments(
      smartContractAddress: {is: "0x8a9c889E60eE674f0D55075fA0D60FB05E1a7aEe"}
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
              this.bPOLaddresses.push(arr.data.ethereum.arguments[i].caller.address)
            }
          });
      console.log(this.bPOLaddresses);
      this.bPOLaddressesPart1 = this.bPOLaddresses.slice(0,1500).join('","')
      this.bPOLaddressesPart2 = this.bPOLaddresses.slice(1500,3000).join('","')
      this.bPOLaddressesPart3 = this.bPOLaddresses.slice(3000, 4500).join('","')
      this.bPOLaddressesPart4 = this.bPOLaddresses.slice(4500).join('","')
      console.log(this.bPOLaddressesPart3)
      await this.takeBPOLPart1()
      await this.takeBPOLPart2()
      await this.takeBPOLPart3()
      for (const [key, value] of this.sortBPolPart1.entries()) {
        this.sortBPol.set(key,value)
      }
      for (const [key, value] of this.sortBPolPart2.entries()) {
        this.sortBPol.set(key,value)
      }
      for (const [key, value] of this.sortBPolPart3.entries()) {
        this.sortBPol.set(key,value)
      }
      this.sortBPol = new Map([...this.sortBPol.entries()].sort((a, b) => b[1] - a[1]));
      let addre = []
      addre.push(this.sortBPol.keys())
      this.bPOLaddress = addre[0]
      this.loader = false
    },
    async takeBPOLPart1(){
      const query = `
 query ($address: [String!] = ["${this.bPOLaddressesPart1}"]) {
  ethereum(network: bsc) {
    address(address: {in: $address}) {
      balances(currency: {in: ["0x8a9c889E60eE674f0D55075fA0D60FB05E1a7aEe"]}) {
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
      await fetch(this.url, optss)
          .then((response) => {
            return response.json();
          })
          .then((arr) => {
            // console.log(arr.data.ethereum.address[0].balances[0].value)
            console.log(arr)
            let bPol = new Map()
            for (let i = 0; i < arr.data.ethereum.address.length; i++) {
              if (arr.data.ethereum.address[i].balances[0] !== undefined && arr.data.ethereum.address !== 0) {
                if (arr.data.ethereum.address[i].balances[0].value > 0) {
                  bPol.set(arr.data.ethereum.address[i].address, arr.data.ethereum.address[i].balances[0].value)
                }
              }
            }
            this.sortBPolPart1 = new Map([...bPol.entries()].sort((a, b) => b[1] - a[1]));
            let addre = []
            addre.push(this.sortBPolPart1.keys())
            this.bPOLaddressPart1 = addre[0]
          });


    },
    async takeBPOLPart2(){
      const query = `
 query ($address: [String!] = ["${this.bPOLaddressesPart2}"]) {
  ethereum(network: bsc) {
    address(address: {in: $address}) {
      balances(currency: {in: ["0x8a9c889E60eE674f0D55075fA0D60FB05E1a7aEe"]}) {
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
      await fetch(this.url, optss)
          .then((response) => {
            return response.json();
          })
          .then((arr) => {
            // console.log(arr.data.ethereum.address[0].balances[0].value)
            let bPol = new Map()
            for (let i = 0; i < arr.data.ethereum.address.length; i++) {
              if (arr.data.ethereum.address[i].balances[0] !== undefined && arr.data.ethereum.address !== 0) {
                if (arr.data.ethereum.address[i].balances[0].value > 0) {
                  bPol.set(arr.data.ethereum.address[i].address, arr.data.ethereum.address[i].balances[0].value)
                }
              }
            }
            this.sortBPolPart2 = new Map([...bPol.entries()].sort((a, b) => b[1] - a[1]));
            let addre = []
            addre.push(this.sortBPolPart2.keys())
            this.bPOLaddressPart2 = addre[0]
          });
    },
    async takeBPOLPart3(){
      
      const query = `
 query ($address: [String!] = ["${this.bPOLaddressesPart3}"]) {
  ethereum(network: bsc) {
    address(address: {in: $address}) {
      balances(currency: {in: ["0x8a9c889E60eE674f0D55075fA0D60FB05E1a7aEe"]}) {
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
      
      await fetch(this.url, optss)
          .then((response) => {
            console.log(1111)
            return response.json();
            
          })
          .then((arr) => {
            
            let bPol = new Map()
            for (let i = 0; i < arr.data.ethereum.address.length; i++) {
              if (arr.data.ethereum.address[i].balances[0] !== undefined && arr.data.ethereum.address !== 0) {
                if (arr.data.ethereum.address[i].balances[0].value > 0) {
                  bPol.set(arr.data.ethereum.address[i].address, arr.data.ethereum.address[i].balances[0].value)
                }
              }
            }
            this.sortBPolPart3 = new Map([...bPol.entries()].sort((a, b) => b[1] - a[1]));
            let addre = []
            addre.push(this.sortBPolPart3.keys())
            this.bPOLaddressPart3 = addre[0]
          });
    },
    async takeBPOLPart4(){
      
      const query = `
 query ($address: [String!] = ["${this.bPOLaddressesPart3}"]) {
  ethereum(network: bsc) {
    address(address: {in: $address}) {
      balances(currency: {in: ["0x8a9c889E60eE674f0D55075fA0D60FB05E1a7aEe"]}) {
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
      
      await fetch(this.url, optss)
          .then((response) => {
            console.log(1111)
            return response.json();
            
          })
          .then((arr) => {
            console.log(arr)
            let bPol = new Map()
            for (let i = 0; i < arr.data.ethereum.address.length; i++) {
              if (arr.data.ethereum.address[i].balances[0] !== undefined && arr.data.ethereum.address !== 0) {
                if (arr.data.ethereum.address[i].balances[0].value > 0) {
                  bPol.set(arr.data.ethereum.address[i].address, arr.data.ethereum.address[i].balances[0].value)
                }
              }
            }
            this.sortBPolPart4 = new Map([...bPol.entries()].sort((a, b) => b[1] - a[1]));
            let addre = []
            addre.push(this.sortBPolPart4.keys())
            this.bPOLaddressPart4 = addre[0]
          });
    }

  },
}
</script>

<style scoped>
li{
  list-style: none;
}
</style>