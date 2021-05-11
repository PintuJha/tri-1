import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import Link from '@material-ui/core/Link';
export default class NewPurchase extends React.Component{
    render(){
        return(
            <>
              {/* =============BREAD CRUMBS SECTION CODE START==================== */}
         <Breadcrumbs className="bread-link-sec" aria-label="breadcrumb">
             <Link color="inherit" href="/Salary">Salary</Link>
             <Link color="inherit" href="/Rental">Rental</Link>

             <Link color="inherit" href="/CommissionList">Commission List</Link>
             <Link color="inherit" href="/NewExpense">New Expense</Link>
             <Link color="inherit" href="/NewPurchase">New Purchase</Link>
             <Link color="inherit" href="/DaySummary">Day Summary</Link>
             <Link color="inherit" href="/SaleReport">Sale Report</Link>
             <Link color="inherit" href="/Statement">P & L Statement</Link>
          </Breadcrumbs>
         
 
{/* =============BREAD CRUMBS SECTION CODE START==================== */}
                <h1>New Purchase</h1>
            </>
        )
    }
}