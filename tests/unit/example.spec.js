import {mount, shallowMount} from '@vue/test-utils'
import ETH from '@/components/ETH.vue'
import fetch from 'node-fetch';
// global.fetch = require('node-fetch');
describe('ETH.vue', () => {

    // let wrapper;
    // wrapper = shallowMount(ETH);

    it('check top 10 values', async () => {
      // const fetch = require("node-fetch");
      let addresses = []
      let address = []
      const pol = new Map()
      let sortPol = new Map()
      const url = "https://graphql.bitquery.io/"


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
        console.log(321)
      await fetch(url, opts)
          .then((response) => {
            return response.json();
          })
          .then((arr) => {
            for (let i = 0; i < arr.data.ethereum.arguments.length; i++) {
              addresses.push(arr.data.ethereum.arguments[i].caller.address)
            }
          })
        console.log(321)
      // console.log(addresses);
      // console.log(addresses.join('","'));
      addresses = addresses.join('","')
      // console.log(addresses[0])
      await takePOL()


    async function takePOL(){
      const query = `
    query ($addresses: [String!] = ["${addresses}"])
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
      await fetch(url, optss)
          .then((response) => {
            return response.json();
          })
          .then((arr) => {
            for (let i = 0; i < arr.data.ethereum.address.length; i++) {
              if (arr.data.ethereum.address[i].balances[0] !== undefined && arr.data.ethereum.address !== 0) {
                if (arr.data.ethereum.address[i].balances[0].value > 0) {
                  pol.set(arr.data.ethereum.address[i].address, arr.data.ethereum.address[i].balances[0].value)
                }
              }
            }
              // console.log(pol)
            sortPol = new Map([...pol.entries()].sort((a, b) => b[1] - a[1]));
            let addre = []
            addre.push(sortPol.keys())
            address = addre[0]

          })



    }
    let arrayValues = [...pol.values()]
      // console.log(arrayValues)
      for (let j = arrayValues.length - 1; j > 0; j--) {
          for (let i = 0; i < j; i++) {
              if (arrayValues[i] > arrayValues[i + 1]) {
                  let temp = arrayValues[i];
                  arrayValues[i] = arrayValues[i + 1];
                  arrayValues[i + 1] = temp;
              }
          }
      }


        // console.log(ETH.methods.takeArrayPOL())

        const wrapper = mount(ETH)
           await expect(ETH.methods.takeAllPOL()).toEqual(arrayValues.reverse().slice(0, 10))
            done()
  })

})
