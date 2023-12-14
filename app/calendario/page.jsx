import Calendar from "../_components/Calendar";
import { kv, createClient  } from '@vercel/kv';

export default function Calendario(){

    const client = createClient({
        url: "https://subtle-stallion-49535.kv.vercel-storage.com",
        token: "AcF_ASQgOTNiZGQ0ZTItYmQ1Yi00NDE1LTk2YjQtMGY2YmM1MzY4NDYyMzQ1YjI0OTgxZGFkNGM3NWFlMTRkYzAyMzI1Y2ZjYTY=",
      });
    
      const SaveUser = async () => {
    
        // Crea un objeto JSON con los datos del usuario
        const user = {
          userId: 123,
          email: 'ex@example.com',
          name: 'Example'
        };
        // Guarda el objeto JSON en un hash llamado 'users'
        await client.hset('users', user);
      };
    
      const GetUser = async () => {
        // Obtiene el objeto JSON con los datos del usuario desde el hash 'users'
        const user = await client.hget('users', 'userId');
        // Haz algo con el objeto JSON
        console.log(user);
      };

      
    return(
        <>
        <Calendar />
        </>
    )
}