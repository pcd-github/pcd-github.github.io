
import { Stack } from "@mui/material";
import AppBar from '@mui/material/AppBar';

import './App.css';
import SWRCalc from './swrcalc.js';

function App() {
  
  return (
      <Stack spacing={5}>
        <AppBar> SWR Calculator</AppBar>
        <Stack direction='row'>
          <SWRCalc />
        </Stack>
      </Stack>
  );
}

export default App;
