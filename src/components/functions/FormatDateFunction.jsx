import { format ,parseISO } from 'date-fns'
import { es } from 'date-fns/locale';
export  const FormatDateFunction = (timestamp ) => {
  const dateParse = parseISO(timestamp )
  return format(dateParse,"EEE dd 'de' MMM 'de' yyyy", { locale: es }) 
}
