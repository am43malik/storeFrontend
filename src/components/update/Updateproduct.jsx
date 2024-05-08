import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const Updateproduct = ({update,showDialog,setShowDialog,changeRoweData,updateRow}) => {



console.log(update)
console.log(showDialog)
return(
    <div>
        <div>
     {update && (
          <Dialog open={showDialog} style={{ height: 600 }}>
            <DialogTitle>Update Data</DialogTitle>
            <DialogContent>

            
               <form className="space-y-4 my-6">
 

      <div className="container d-flex flex-column align-items-center">
        <div className="row my-2">
          <div className="col-md-6">
            <TextField
              id="outlined-basic"
              label="Item code"
              variant="outlined"
              name="itemCode"
              value={update.itemCode?.split(" ")[0]}
              onChange={changeRoweData}
              sx={{ width: 250 }}
              required
            />
          </div>
          <div className="col-md-6">
            <TextField
              id="outlined-basic"
              label="Enter product name"
              variant="outlined"
              sx={{ width: 250 }}
              required
              name="productName"
              value={update.productName}
              onChange={changeRoweData}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-md-6">
            <TextField
              id="outlined-basic"
              label="Unit"
              variant="outlined"
              sx={{ width: 250 }}
              required
              name="unit"
              value={update.unit}
              onChange={changeRoweData}
            />
          </div>
          <div className="col-md-6">
            <TextField
              id="outlined-basic"
              label="Physical location"
              variant="outlined"
              sx={{ width: 250 }}
              required
              name="physicalLocation"
              value={update.physicalLocation}
              onChange={changeRoweData}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-md-6">
            <TextField
              id="outlined-basic"
              label="Lot number"
              variant="outlined"
              sx={{ width: 250 }}
              name="lotNumber"
              value={update.lotNumber}
              onChange={changeRoweData}
            />
          </div>
          <div className="col-md-6">
            <TextField
              id="outlined-basic"
              label="Manufacturer"
              variant="outlined"
              sx={{ width: 250 }}
              required
              name="manufacturer"
              value={update.manufacturer}
              onChange={changeRoweData}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-md-6">
            <TextField
              id="outlined-basic"
              label="Supplier name"
              variant="outlined"
              sx={{ width: 250 }}
              required
              name="supplierName"
              value={update.supplierName}
              onChange={changeRoweData}
            />
          </div>
          <div className="col-md-6">
            <TextField
              id="outlined-basic"
              label="Add model"
              variant="outlined"
              sx={{ width: 250 }}
              required
              name="addModel"
              value={update.addModel}
              onChange={changeRoweData}
            />
          </div>
         
        </div>
        <div className="row my-2">
          <div className="col-md-6">
            <TextField
              id="outlined-basic"
              label="S.K.U"
              variant="outlined"
              sx={{ width: 250 }}
              required
              name="sku"
              value={update.sku}
              onChange={changeRoweData}
            />
          </div>
          <div className="col-md-6">
            <TextField
              id="outlined-basic"
              label="Department"
              variant="outlined"
              sx={{ width: 250 }}
              required
              name="department"
              value={update.department}
              onChange={changeRoweData}
            />
          </div>
    
         
        </div>
        
      </div>
     
    </form>
            </DialogContent>
            <DialogActions>
              <Button type="submit" variant="contained" onClick={updateRow}>
                Update
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setShowDialog(false);
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )}
</div>

    </div>
)
}

export default Updateproduct