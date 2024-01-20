document.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/814295bd94954228a7dce15310db1cc3/ap")
        .then((response) => {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                showuseronscreen(response.data[i]);
            }
            updateTotalCost(); // Update total cost on page load
        })
        .catch((err) => {
            console.log(err);
        });
});

function savetocloud(event) {
    event.preventDefault();
    const sellno = event.target.sellno.value;
    const product = event.target.product.value;

    const obj = {
        sellno,
        product
    };

    axios.post("https://crudcrud.com/api/814295bd94954228a7dce15310db1cc3/ap", obj)
       .then((response)=>{
            showuseronscreen(response.data);
       })
       .catch((err)=>{
            document.body.innerHTML=document.body.innerHTML + "<h4>Something is wrong</h4>"
            console.log(err)
       })
}

function showuseronscreen(obj) {
    const parentElem = document.getElementById('Listofusers');
    const childelem = document.createElement('li');
    childelem.textContent = obj.sellno + '-' + obj.product ;

    const deletebutton = document.createElement('input');
    deletebutton.type = "button";
    deletebutton.value = 'DeleteProduct';
    deletebutton.onclick = () => {
        axios.delete(`https://crudcrud.com/api/814295bd94954228a7dce15310db1cc3/ap/${obj._id}`)
        .then(() => {
            parentElem.removeChild(childelem);
            updateTotalCost(); // Update the total cost after deletion
        })
        .catch((err) => {
            console.log(err);
        });
    };

    childelem.appendChild(deletebutton);

    const editbutton = document.createElement('input');
    editbutton.type = "button";
    editbutton.value = 'EditProduct';
    editbutton.onclick = () => {
        axios.delete(`https://crudcrud.com/api/814295bd94954228a7dce15310db1cc3/ap/${obj._id}`)
        .then(() => {
            document.getElementById('sellpricetag').value = obj.sellno;
            document.getElementById('productnametag').value = obj.product;
            
            parentElem.removeChild(childelem);
            updateTotalCost(); // Update the total cost after deletion
        })
        .catch((err) => {
            console.log(err);
        });
    };

    childelem.appendChild(editbutton);
    parentElem.appendChild(childelem);

    updateTotalCost(); // Update the total cost after adding a new item
}

function updateTotalCost() {
    const parentElem = document.getElementById('Listofusers');
    const items = parentElem.getElementsByTagName('li');
    let totalCost = 0;

    for (let i = 0; i < items.length; i++) {
        const itemText = items[i].textContent;
        const sellPrice = parseInt(itemText.split('-')[0]);
        totalCost += sellPrice;
    }

    document.getElementById('TotalCost').textContent = `Total Cost: $${totalCost}`;
}