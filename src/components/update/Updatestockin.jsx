import { Button } from '@mui/material';
import React from 'react'

const Updatestockin = () => {
  return (
    <div>             <form>
    {/* Thsi Diloag box for Delete Alert  */}

{alert && (
<Dialog open={alert} style={{ height: 600 }}>
<DialogTitle>Delete Row</DialogTitle>
<DialogContent>
<DialogContentText id="alert-dialog-description">
Are You sure You want to delete this.
</DialogContentText>
</DialogContent>
<DialogActions>

<Button variant="contained">
{/* <Button variant="contained" onClick={() => deleteRow(update)}> */}
Yes
</Button>
<Button
variant="outlined"
color="error"
onClick={() => {
  setAlert(false);
}}
>
Cancel
</Button>
</DialogActions>
</Dialog>
)}
{update && 
(
<Dialog open={showDialog}  fullWidth
>
<DialogTitle className='text-center'>Update Data</DialogTitle>
<DialogContent>
<div className="row mt-4">
<div className="col-auto">
 <TextField id='outlined-basic' label="Doc" sx={{width:120}} value={update.doc} />
  </div>
    <div className="row">
    <div className="col-auto">
  <Autocomplete
disablePortal
value={update.department}
id="combo-box-demo"
//  options={Department}
sx={{ width: 400 }}
renderInput={(params) => <TextField {...params} label="Select department" required  />}
onChange={(event,newValue)=>{
  setSelectedDepartment(newValue)
}}
/>
    </div>
  
  </div>
  
  <div className="row mt-4 mx-2">

  <div className="col">
  <Autocomplete
disablePortal
id="combo-box-demo"
value={update.itemDescription}
 options={Product}
sx={{width:550}}
renderInput={(params) => <TextField {...params} label="Select item code,Product name" required/>}

/>
  </div>
  </div>
  <div className="row mt-4 mx-2">

  <div className="col">
 <TextField id="outlined-basic" label="Quantity" sx={{width:550}} value={update.quantity} name='quantity' onChange={updateData} />
  </div>
  </div>
  <div className="row mt-4 mx-2">

  <div className="col">
  <LocalizationProvider dateAdapter={AdapterDayjs}>
<DatePicker
sx={{ width: 550 }}

label="Choose expiry date"
value={dayjs(update.date)}
onChange={(newValue) => {
  selectedExpiry(newValue);
}}
required
renderInput={(params) => (
  <TextField name="date" {...params} />
)}

/>
</LocalizationProvider>
  </div>
  </div>
 
</div>

</DialogContent>
<DialogActions>
<Button type="submit" variant="contained" >
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
)

} 

  </form></div>
  )
}

export default Updatestockin