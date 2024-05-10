import { AppBar, Box, Grid, Toolbar } from "@mui/material";

const Header = () => {
    return (
        <AppBar position="static" className="h-30">
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <Toolbar disableGutters variant='dense' sx={{ minHeight: 50 }} >
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', marginTop: 3, marginBottom: 3, minWidth: 650 } }}>
                            <Box sx={{ borderRight: 1, paddingLeft: 1, paddingRight: 1 }}>
                                {/* <a id="returnToSpear" title="Return to SPEAR" className="header-nav-link custom-font-size">Return to SPEAR</a> */}
                                <p>This is the header bar</p>
                            </Box>
                        </Box>
                    </Toolbar>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default Header;