import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, CheckCircle2, Send, Globe, MapPin, Phone, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingAnimation from '@/components/LoadingAnimation';
import SuccessBanner from '@/components/SuccessBanner';
import { sendTelegramMessage, sendTelegramFiles, formatSubmitCaseMessage } from '@/lib/telegram';
import { motion } from 'framer-motion';

// Comprehensive worldwide country data with states/provinces and cities
const COUNTRIES_DATA: Record<string, { code: string; states: Record<string, string[]> }> = {
  'Afghanistan': {
    code: '+93',
    states: {
      'Kabul': ['Kabul', 'Bagram'],
      'Herat': ['Herat', 'Islam Qala'],
      'Kandahar': ['Kandahar', 'Spin Boldak'],
    }
  },
  'Albania': {
    code: '+355',
    states: {
      'Tirana': ['Tirana', 'Durrës'],
      'Vlorë': ['Vlorë', 'Sarandë'],
      'Shkodër': ['Shkodër', 'Lezhë'],
    }
  },
  'Algeria': {
    code: '+213',
    states: {
      'Algiers': ['Algiers', 'Bab El Oued'],
      'Oran': ['Oran', 'Sidi Bel Abbès'],
      'Constantine': ['Constantine', 'Skikda'],
    }
  },
  'Andorra': {
    code: '+376',
    states: {
      'Andorra la Vella': ['Andorra la Vella', 'Escaldes-Engordany'],
    }
  },
  'Angola': {
    code: '+244',
    states: {
      'Luanda': ['Luanda', 'Viana'],
      'Huambo': ['Huambo', 'Catumbela'],
      'Benguela': ['Benguela', 'Lobito'],
    }
  },
  'Argentina': {
    code: '+54',
    states: {
      'Buenos Aires': ['Buenos Aires', 'La Plata', 'Mar del Plata'],
      'Córdoba': ['Córdoba', 'Rosario'],
      'Mendoza': ['Mendoza', 'San Rafael'],
      'Santa Fe': ['Rosario', 'Santa Fe'],
    }
  },
  'Australia': {
    code: '+61',
    states: {
      'New South Wales': ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast'],
      'Victoria': ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo'],
      'Queensland': ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Cairns'],
      'Western Australia': ['Perth', 'Fremantle', 'Mandurah', 'Bunbury'],
      'South Australia': ['Adelaide', 'Port Augusta'],
      'Tasmania': ['Hobart', 'Launceston'],
    }
  },
  'Austria': {
    code: '+43',
    states: {
      'Vienna': ['Vienna', 'Graz'],
      'Salzburg': ['Salzburg', 'Hallein'],
      'Tyrol': ['Innsbruck', 'Wörgl'],
    }
  },
  'Azerbaijan': {
    code: '+994',
    states: {
      'Baku': ['Baku', 'Sumgait'],
      'Ganja': ['Ganja', 'Mingachevir'],
    }
  },
  'Bahamas': {
    code: '+1',
    states: {
      'Nassau': ['Nassau', 'Paradise'],
      'Freeport': ['Freeport', 'Nassauville'],
    }
  },
  'Bahrain': {
    code: '+973',
    states: {
      'Manama': ['Manama', 'Muharraq'],
      'Riffa': ['Riffa', 'Isa Town'],
    }
  },
  'Bangladesh': {
    code: '+880',
    states: {
      'Dhaka': ['Dhaka', 'Narayanganj', 'Gazipur'],
      'Chittagong': ['Chittagong', 'Comilla'],
      'Khulna': ['Khulna', 'Barisal'],
    }
  },
  'Barbados': {
    code: '+1',
    states: {
      'Bridgetown': ['Bridgetown', 'Oistins'],
      'Saint Michael': ['Saint Michael', 'Bathsheba'],
    }
  },
  'Belarus': {
    code: '+375',
    states: {
      'Minsk': ['Minsk', 'Brest'],
      'Gomel': ['Gomel', 'Mogilev'],
      'Grodno': ['Grodno', 'Vitebsk'],
    }
  },
  'Belgium': {
    code: '+32',
    states: {
      'Brussels': ['Brussels', 'Antwerp'],
      'Flanders': ['Ghent', 'Bruges'],
      'Wallonia': ['Liège', 'Charleroi'],
    }
  },
  'Belize': {
    code: '+501',
    states: {
      'Belize City': ['Belize City', 'San Pedro'],
      'Orange Walk': ['Orange Walk', 'Corozal'],
    }
  },
  'Benin': {
    code: '+229',
    states: {
      'Cotonou': ['Cotonou', 'Porto-Novo'],
      'Abomey': ['Abomey', 'Parakou'],
    }
  },
  'Bhutan': {
    code: '+975',
    states: {
      'Thimphu': ['Thimphu', 'Paro'],
      'Punakha': ['Punakha', 'Tongsa'],
    }
  },
  'Bolivia': {
    code: '+591',
    states: {
      'La Paz': ['La Paz', 'El Alto'],
      'Santa Cruz': ['Santa Cruz de la Sierra', 'Yacuiba'],
      'Cochabamba': ['Cochabamba', 'Sucre'],
    }
  },
  'Bosnia and Herzegovina': {
    code: '+387',
    states: {
      'Sarajevo': ['Sarajevo', 'Zenica'],
      'Federation': ['Mostar', 'Tuzla'],
      'Republika Srpska': ['Banja Luka', 'Prijedor'],
    }
  },
  'Botswana': {
    code: '+267',
    states: {
      'Gaborone': ['Gaborone', 'Francistown'],
      'Kalahari': ['Serowe', 'Palapye'],
    }
  },
  'Brazil': {
    code: '+55',
    states: {
      'São Paulo': ['São Paulo', 'Campinas', 'Santos', 'Guarulhos'],
      'Rio de Janeiro': ['Rio de Janeiro', 'Niterói'],
      'Minas Gerais': ['Belo Horizonte', 'Uberlândia'],
      'Bahia': ['Salvador', 'Feira de Santana'],
      'Pernambuco': ['Recife', 'Olinda'],
    }
  },
  'Brunei': {
    code: '+673',
    states: {
      'Bandar Seri Begawan': ['Bandar Seri Begawan', 'Tutong'],
      'Kuala Belait': ['Kuala Belait', 'Seria'],
    }
  },
  'Bulgaria': {
    code: '+359',
    states: {
      'Sofia': ['Sofia', 'Sofiya'],
      'Plovdiv': ['Plovdiv', 'Stara Zagora'],
      'Varna': ['Varna', 'Burgas'],
    }
  },
  'Burkina Faso': {
    code: '+226',
    states: {
      'Ouagadougou': ['Ouagadougou', 'Bobo-Dioulasso'],
      'Kadiogo': ['Ouagadougou', 'Koudougou'],
    }
  },
  'Burundi': {
    code: '+257',
    states: {
      'Gitega': ['Gitega', 'Bujumbura'],
      'Muramvya': ['Muramvya', 'Ngozi'],
    }
  },
  'Cambodia': {
    code: '+855',
    states: {
      'Phnom Penh': ['Phnom Penh', 'Siem Reap'],
      'Battambang': ['Battambang', 'Pursat'],
    }
  },
  'Cameroon': {
    code: '+237',
    states: {
      'Yaoundé': ['Yaoundé', 'Douala'],
      'Littoral': ['Douala', 'Garoua'],
      'North': ['Garoua', 'Ngaoundéré'],
    }
  },
  'Canada': {
    code: '+1',
    states: {
      'Ontario': ['Toronto', 'Ottawa', 'Hamilton', 'London', 'Mississauga'],
      'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau'],
      'British Columbia': ['Vancouver', 'Victoria', 'Surrey', 'Burnaby'],
      'Alberta': ['Calgary', 'Edmonton', 'Lethbridge'],
      'Manitoba': ['Winnipeg', 'Brandon'],
      'Saskatchewan': ['Saskatoon', 'Regina'],
      'Nova Scotia': ['Halifax', 'Sydney'],
      'New Brunswick': ['Saint John', 'Fredericton'],
    }
  },
  'Cape Verde': {
    code: '+238',
    states: {
      'Praia': ['Praia', 'Mindelo'],
      'Santiago': ['Santiago', 'São Vicente'],
    }
  },
  'Central African Republic': {
    code: '+236',
    states: {
      'Bangui': ['Bangui', 'Berberati'],
      'Bambari': ['Bambari', 'Bossangoa'],
    }
  },
  'Chad': {
    code: '+235',
    states: {
      "N'Djamena": ["N'Djamena", 'Sarh'],
      'Kanem': ['Kanem', 'Moundou'],
    }
  },
  'Chile': {
    code: '+56',
    states: {
      'Santiago': ['Santiago', 'Puente Alto', 'San Bernardo'],
      'Valparaíso': ['Valparaíso', 'Viña del Mar'],
      'Bío-Bío': ['Concepción', 'Los Ángeles'],
    }
  },
  'China': {
    code: '+86',
    states: {
      'Beijing': ['Beijing', 'Chaoyang'],
      'Shanghai': ['Shanghai', 'Pudong'],
      'Guangdong': ['Guangzhou', 'Shenzhen', 'Foshan'],
      'Zhejiang': ['Hangzhou', 'Wenzhou'],
      'Jiangsu': ['Nanjing', 'Suzhou', 'Wuxi'],
    }
  },
  'Colombia': {
    code: '+57',
    states: {
      'Bogotá': ['Bogotá', 'Medellín'],
      'Antioquia': ['Medellín', 'Envigado'],
      'Valle del Cauca': ['Cali', 'Buenaventura'],
      'Atlantico': ['Barranquilla', 'Cartagena'],
    }
  },
  'Comoros': {
    code: '+269',
    states: {
      'Moroni': ['Moroni', 'Mutsamudu'],
      'Grande Comore': ['Moroni', 'Fomboni'],
    }
  },
  'Congo': {
    code: '+242',
    states: {
      'Brazzaville': ['Brazzaville', 'Pointe-Noire'],
      'Kasai': ['Kasai', 'Dolisie'],
    }
  },
  'Costa Rica': {
    code: '+506',
    states: {
      'San José': ['San José', 'Alajuela'],
      'Cartago': ['Cartago', 'Heredia'],
      'Limón': ['Puerto Limón', 'San Isidro'],
    }
  },
  'Croatia': {
    code: '+385',
    states: {
      'Zagreb': ['Zagreb', 'Split'],
      'Dalmatia': ['Split', 'Dubrovnik'],
      'Istria': ['Rijeka', 'Pula'],
    }
  },
  'Cuba': {
    code: '+53',
    states: {
      'Havana': ['Havana', 'Santiago de Cuba'],
      'Matanzas': ['Matanzas', 'Cienfuegos'],
      'Oriente': ['Santiago de Cuba', 'Guantanamo'],
    }
  },
  'Cyprus': {
    code: '+357',
    states: {
      'Nicosia': ['Nicosia', 'Larnaca'],
      'Limassol': ['Limassol', 'Paphos'],
    }
  },
  'Czech Republic': {
    code: '+420',
    states: {
      'Prague': ['Prague', 'Brno'],
      'Bohemia': ['Prague', 'Plzeň'],
      'Moravia': ['Brno', 'Ostrava'],
    }
  },
  'Denmark': {
    code: '+45',
    states: {
      'Copenhagen': ['Copenhagen', 'Aarhus'],
      'Jutland': ['Aarhus', 'Aalborg'],
    }
  },
  'Djibouti': {
    code: '+253',
    states: {
      'Djibouti City': ['Djibouti City', 'Ali Sabieh'],
      'Tadjourah': ['Tadjourah', 'Obock'],
    }
  },
  'Dominica': {
    code: '+1',
    states: {
      'Roseau': ['Roseau', 'Portsmouth'],
      'Saint George': ['Saint George', 'Mahaut'],
    }
  },
  'Dominican Republic': {
    code: '+1',
    states: {
      'Santo Domingo': ['Santo Domingo', 'Santiago'],
      'Puerto Plata': ['Puerto Plata', 'La Romana'],
    }
  },
  'Ecuador': {
    code: '+593',
    states: {
      'Pichincha': ['Quito', 'Latacunga'],
      'Guayas': ['Guayaquil', 'Daule'],
      'Manabí': ['Manta', 'Portoviejo'],
    }
  },
  'Egypt': {
    code: '+20',
    states: {
      'Cairo': ['Cairo', 'Giza'],
      'Alexandria': ['Alexandria', 'Port Said'],
      'Aswan': ['Aswan', 'Luxor'],
    }
  },
  'El Salvador': {
    code: '+503',
    states: {
      'San Salvador': ['San Salvador', 'Soyapango'],
      'Santa Ana': ['Santa Ana', 'Ahuachapán'],
    }
  },
  'Equatorial Guinea': {
    code: '+240',
    states: {
      'Malabo': ['Malabo', 'Bata'],
      'Littoral': ['Bata', 'Ebebiyin'],
    }
  },
  'Eritrea': {
    code: '+291',
    states: {
      'Asmara': ['Asmara', 'Keren'],
      'Massawa': ['Massawa', 'Mendefera'],
    }
  },
  'Estonia': {
    code: '+372',
    states: {
      'Tallinn': ['Tallinn', 'Tartu'],
      'Harju': ['Tallinn', 'Rapla'],
    }
  },
  'Ethiopia': {
    code: '+251',
    states: {
      'Addis Ababa': ['Addis Ababa', 'Dire Dawa'],
      'Amhara': ['Bahir Dar', 'Gondar'],
    }
  },
  'Fiji': {
    code: '+679',
    states: {
      'Viti Levu': ['Suva', 'Nadi'],
      'Vanua Levu': ['Labasa', 'Savusavu'],
    }
  },
  'Finland': {
    code: '+358',
    states: {
      'Helsinki': ['Helsinki', 'Espoo'],
      'Tampere': ['Tampere', 'Turku'],
    }
  },
  'France': {
    code: '+33',
    states: {
      'Île-de-France': ['Paris', 'Boulogne-Billancourt', 'Saint-Denis'],
      'Provence-Alpes-Côte d\'Azur': ['Marseille', 'Nice', 'Cannes'],
      'Auvergne-Rhône-Alpes': ['Lyon', 'Grenoble', 'Saint-Etienne'],
      'Nouvelle-Aquitaine': ['Bordeaux', 'Toulouse'],
    }
  },
  'Gabon': {
    code: '+241',
    states: {
      'Estuaire': ['Libreville', 'Port-Gentil'],
      'Haut-Ogooué': ['Franceville', 'Moanda'],
    }
  },
  'Gambia': {
    code: '+220',
    states: {
      'Banjul': ['Banjul', 'Serekunda'],
      'Brufut': ['Brufut', 'Kotu'],
    }
  },
  'Georgia': {
    code: '+995',
    states: {
      'Tbilisi': ['Tbilisi', 'Kutaisi'],
      'Adjara': ['Batumi', 'Sarpi'],
    }
  },
  'Germany': {
    code: '+49',
    states: {
      'Berlin': ['Berlin', 'Potsdam'],
      'Bavaria': ['Munich', 'Nuremberg', 'Augsburg'],
      'North Rhine-Westphalia': ['Cologne', 'Düsseldorf', 'Dortmund'],
      'Hesse': ['Frankfurt', 'Wiesbaden'],
    }
  },
  'Ghana': {
    code: '+233',
    states: {
      'Greater Accra': ['Accra', 'Tema', 'Kasoa'],
      'Ashanti': ['Kumasi', 'Obuasi', 'Ejisu'],
      'Central': ['Cape Coast', 'Sekondi-Takoradi'],
      'Northern': ['Tamale', 'Bolgatanga'],
    }
  },
  'Greece': {
    code: '+30',
    states: {
      'Attica': ['Athens', 'Piraeus'],
      'Central Greece': ['Larissa', 'Volos'],
      'Crete': ['Heraklion', 'Chania'],
    }
  },
  'Grenada': {
    code: '+1',
    states: {
      'Saint George\'s': ['Saint George\'s', 'Grenville'],
      'Saint Andrew': ['Sauteurs', 'Gouyave'],
    }
  },
  'Guatemala': {
    code: '+502',
    states: {
      'Guatemala': ['Guatemala City', 'Mixco'],
      'Sacatepéquez': ['Antigua Guatemala', 'San Lucas Sacatepéquez'],
    }
  },
  'Guinea': {
    code: '+224',
    states: {
      'Conakry': ['Conakry', 'Kindia'],
      'Kindia': ['Kindia', 'Mamou'],
    }
  },
  'Guinea-Bissau': {
    code: '+245',
    states: {
      'Bissau': ['Bissau', 'Bafatá'],
      'Gabu': ['Gabu', 'Cacheu'],
    }
  },
  'Guyana': {
    code: '+592',
    states: {
      'Demerara-Mahaica': ['Georgetown', 'Linden'],
      'Berbice': ['New Amsterdam', 'Corriverton'],
    }
  },
  'Haiti': {
    code: '+509',
    states: {
      'Ouest': ['Port-au-Prince', 'Mirebalais'],
      'Nord': ['Cap-Haïtien', 'Limbe'],
    }
  },
  'Honduras': {
    code: '+504',
    states: {
      'Francisco Morazán': ['Tegucigalpa', 'Comayagüela'],
      'Cortés': ['San Pedro Sula', 'La Ceiba'],
    }
  },
  'Hungary': {
    code: '+36',
    states: {
      'Budapest': ['Budapest', 'Debrecen'],
      'Pest': ['Kecskemét', 'Szeged'],
    }
  },
  'Iceland': {
    code: '+354',
    states: {
      'Reykjavík': ['Reykjavík', 'Kópavogur'],
      'Akranes': ['Akranes', 'Borgarnes'],
    }
  },
  'India': {
    code: '+91',
    states: {
      'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Aurangabad'],
      'Delhi': ['New Delhi', 'Delhi', 'Dwarka'],
      'Karnataka': ['Bangalore', 'Mangalore', 'Mysore', 'Hubballi'],
      'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
      'Telangana': ['Hyderabad', 'Secunderabad'],
      'Gujarat': ['Ahmedabad', 'Vadodara', 'Surat'],
      'West Bengal': ['Kolkata', 'Darjeeling'],
    }
  },
  'Indonesia': {
    code: '+62',
    states: {
      'Jakarta': ['Jakarta', 'Tangerang'],
      'Java': ['Surabaya', 'Bandung', 'Semarang'],
      'Bali': ['Denpasar', 'Ubud'],
      'Sumatra': ['Medan', 'Palembang'],
    }
  },
  'Iran': {
    code: '+98',
    states: {
      'Tehran': ['Tehran', 'Karaj'],
      'Isfahan': ['Isfahan', 'Yazd'],
      'Khuzestan': ['Ahvaz', 'Khorramshahr'],
    }
  },
  'Iraq': {
    code: '+964',
    states: {
      'Baghdad': ['Baghdad', 'Kirkuk'],
      'Basra': ['Basra', 'Nasiriyah'],
      'Erbil': ['Erbil', 'Sulaymaniyah'],
    }
  },
  'Ireland': {
    code: '+353',
    states: {
      'Dublin': ['Dublin', 'Dún Laoghaire'],
      'Cork': ['Cork', 'Youghal'],
      'Galway': ['Galway', 'Athenry'],
    }
  },
  'Israel': {
    code: '+972',
    states: {
      'Tel Aviv': ['Tel Aviv', 'Ramat Gan'],
      'Jerusalem': ['Jerusalem', 'Bethlehem'],
      'Haifa': ['Haifa', 'Netanya'],
    }
  },
  'Italy': {
    code: '+39',
    states: {
      'Lazio': ['Rome', 'Frascati'],
      'Lombardy': ['Milan', 'Como', 'Varese'],
      'Campania': ['Naples', 'Pompei', 'Salerno'],
      'Tuscany': ['Florence', 'Siena', 'Pisa'],
    }
  },
  'Ivory Coast': {
    code: '+225',
    states: {
      'Abidjan': ['Abidjan', 'Yamoussoukro'],
      'Bouaké': ['Bouaké', 'Daloa'],
    }
  },
  'Jamaica': {
    code: '+1',
    states: {
      'Kingston': ['Kingston', 'Spanish Town'],
      'Saint Andrew': ['Montego Bay', 'Falmouth'],
    }
  },
  'Japan': {
    code: '+81',
    states: {
      'Tokyo': ['Tokyo', 'Yokohama', 'Kawasaki'],
      'Osaka': ['Osaka', 'Kobe', 'Kyoto'],
      'Aichi': ['Nagoya', 'Toyota'],
      'Fukuoka': ['Fukuoka', 'Kitakyushu'],
    }
  },
  'Jordan': {
    code: '+962',
    states: {
      'Amman': ['Amman', 'Zarqa'],
      'Salt': ['Salt', 'Madaba'],
      'Aqaba': ['Aqaba', 'Petra'],
    }
  },
  'Kazakhstan': {
    code: '+7',
    states: {
      'Almaty': ['Almaty', 'Karaganda'],
      'Nur-Sultan': ['Nur-Sultan', 'Kokshetau'],
      'Western': ['Aktau', 'Atyrau'],
    }
  },
  'Kenya': {
    code: '+254',
    states: {
      'Nairobi': ['Nairobi', 'Kiambu'],
      'Mombasa': ['Mombasa', 'Nakuru'],
      'Western': ['Kisumu', 'Kericho'],
    }
  },
  'Kiribati': {
    code: '+686',
    states: {
      'Tarawa': ['South Tarawa', 'North Tarawa'],
      'Butaritari': ['Butaritari', 'Maranon'],
    }
  },
  'North Korea': {
    code: '+850',
    states: {
      'Pyongyang': ['Pyongyang', 'Nampo'],
      'Chagang': ['Kanggye', 'Hyesan'],
    }
  },
  'South Korea': {
    code: '+82',
    states: {
      'Seoul': ['Seoul', 'Incheon', 'Suwon'],
      'Busan': ['Busan', 'Ulsan'],
      'Daegu': ['Daegu', 'Daejeon'],
    }
  },
  'Kuwait': {
    code: '+965',
    states: {
      'Kuwait City': ['Kuwait City', 'Salmiya'],
      'Ahmadi': ['Ahmadi', 'Ali Sabah Al-Salem'],
    }
  },
  'Kyrgyzstan': {
    code: '+996',
    states: {
      'Bishkek': ['Bishkek', 'Osh'],
      'Jalal-Abad': ['Jalal-Abad', 'Tokmok'],
    }
  },
  'Laos': {
    code: '+856',
    states: {
      'Vientiane': ['Vientiane', 'Savannakhet'],
      'Luang Prabang': ['Luang Prabang', 'Pakse'],
    }
  },
  'Latvia': {
    code: '+371',
    states: {
      'Riga': ['Riga', 'Daugavpils'],
      'Jurmala': ['Jurmala', 'Liepaja'],
    }
  },
  'Lebanon': {
    code: '+961',
    states: {
      'Beirut': ['Beirut', 'Tripoli'],
      'Mount Lebanon': ['Sidon', 'Tyre'],
    }
  },
  'Lesotho': {
    code: '+266',
    states: {
      'Maseru': ['Maseru', 'Leribe'],
      'Berea': ['Berea', 'Mafeteng'],
    }
  },
  'Liberia': {
    code: '+231',
    states: {
      'Montserrado': ['Monrovia', 'Todee'],
      'Margibi': ['Kakata', 'Todee'],
    }
  },
  'Libya': {
    code: '+218',
    states: {
      'Tripoli': ['Tripoli', 'Benghazi'],
      'Misrata': ['Misrata', 'Tobruk'],
    }
  },
  'Liechtenstein': {
    code: '+423',
    states: {
      'Vaduz': ['Vaduz', 'Schaan'],
      'Triesen': ['Triesen', 'Ruggell'],
    }
  },
  'Lithuania': {
    code: '+370',
    states: {
      'Vilnius': ['Vilnius', 'Kaunas'],
      'Klaipėda': ['Klaipėda', 'Panevėžys'],
    }
  },
  'Luxembourg': {
    code: '+352',
    states: {
      'Luxembourg City': ['Luxembourg City', 'Esch-sur-Alzette'],
      'Differdange': ['Differdange', 'Dudelange'],
    }
  },
  'Madagascar': {
    code: '+261',
    states: {
      'Antananarivo': ['Antananarivo', 'Antsirabe'],
      'Toliara': ['Toliara', 'Mahajanga'],
    }
  },
  'Malawi': {
    code: '+265',
    states: {
      'Lilongwe': ['Lilongwe', 'Blantyre'],
      'Mzuzu': ['Mzuzu', 'Kasungu'],
    }
  },
  'Malaysia': {
    code: '+60',
    states: {
      'Kuala Lumpur': ['Kuala Lumpur', 'Petaling Jaya'],
      'Penang': ['George Town', 'Butterworth'],
      'Johor': ['Johor Bahru', 'Kota Tinggi'],
      'Selangor': ['Shah Alam', 'Subang Jaya'],
    }
  },
  'Maldives': {
    code: '+960',
    states: {
      'Male': ['Male', 'Hulhumalé'],
      'Addu': ['Gan', 'Felidhoo'],
    }
  },
  'Mali': {
    code: '+223',
    states: {
      'Bamako': ['Bamako', 'Kayes'],
      'Gao': ['Gao', 'Timbuktu'],
    }
  },
  'Malta': {
    code: '+356',
    states: {
      'Valletta': ['Valletta', 'Sliema'],
      'Saint Julian': ['Saint Julian', 'Birkirkara'],
    }
  },
  'Marshall Islands': {
    code: '+692',
    states: {
      'Majuro': ['Majuro', 'Ebeye'],
      'Kwajalein': ['Kwajalein', 'Rongelap'],
    }
  },
  'Mauritania': {
    code: '+222',
    states: {
      'Nouakchott': ['Nouakchott', 'Nouadhibou'],
      'Kaédi': ['Kaédi', 'Kiffa'],
    }
  },
  'Mauritius': {
    code: '+230',
    states: {
      'Port Louis': ['Port Louis', 'Beau Bassin-Rose Hill'],
      'Plaines Wilhems': ['Quatre Bornes', 'Vacoas-Phoenix'],
    }
  },
  'Mexico': {
    code: '+52',
    states: {
      'Mexico City': ['Mexico City', 'Ecatepec'],
      'State of Mexico': ['Toluca', 'Nezahualcóyotl'],
      'Jalisco': ['Guadalajara', 'Zapopan', 'Puerto Vallarta'],
      'Veracruz': ['Veracruz', 'Xalapa'],
    }
  },
  'Micronesia': {
    code: '+691',
    states: {
      'Pohnpei': ['Kolonia', 'Palikir'],
      'Chuuk': ['Weno', 'Tonoas'],
    }
  },
  'Moldova': {
    code: '+373',
    states: {
      'Chișinău': ['Chișinău', 'Tiraspol'],
      'Bender': ['Bender', 'Soroca'],
    }
  },
  'Monaco': {
    code: '+377',
    states: {
      'Monaco': ['Monaco-Ville', 'Monte Carlo'],
    }
  },
  'Mongolia': {
    code: '+976',
    states: {
      'Ulaanbaatar': ['Ulaanbaatar', 'Darkhan'],
      'Khövsgöl': ['Mörön', 'Zuunmod'],
    }
  },
  'Montenegro': {
    code: '+382',
    states: {
      'Podgorica': ['Podgorica', 'Cetinje'],
      'Kotor': ['Kotor', 'Perast'],
    }
  },
  'Morocco': {
    code: '+212',
    states: {
      'Rabat-Salé-Kénitra': ['Rabat', 'Salé', 'Kénitra'],
      'Casablanca-Settat': ['Casablanca', 'Settat'],
      'Fez-Meknès': ['Fez', 'Meknès'],
      'Marrakech-Safi': ['Marrakech', 'Essaouira'],
    }
  },
  'Mozambique': {
    code: '+258',
    states: {
      'Maputo': ['Maputo', 'Matola'],
      'Gaza': ['Gaza', 'Inhambane'],
      'Inhambane': ['Inhambane', 'Panda'],
    }
  },
  'Myanmar': {
    code: '+95',
    states: {
      'Yangon': ['Yangon', 'Bago'],
      'Mandalay': ['Mandalay', 'Nay Pyi Taw'],
      'Sagaing': ['Sagaing', 'Monywa'],
    }
  },
  'Namibia': {
    code: '+264',
    states: {
      'Windhoek': ['Windhoek', 'Rundu'],
      'Erongo': ['Walvis Bay', 'Swakopmund'],
    }
  },
  'Nauru': {
    code: '+674',
    states: {
      'Yaren': ['Yaren District', 'Meneng District'],
    }
  },
  'Nepal': {
    code: '+977',
    states: {
      'Kathmandu': ['Kathmandu', 'Bhaktapur'],
      'Pokhara': ['Pokhara', 'Dhulikhel'],
      'Lalitpur': ['Lalitpur', 'Bhaktapur'],
    }
  },
  'Netherlands': {
    code: '+31',
    states: {
      'North Holland': ['Amsterdam', 'Haarlem'],
      'South Holland': ['Rotterdam', 'The Hague', 'Delft'],
      'Utrecht': ['Utrecht', 'Amersfoort'],
    }
  },
  'New Zealand': {
    code: '+64',
    states: {
      'Auckland': ['Auckland', 'Manukau'],
      'Wellington': ['Wellington', 'Lower Hutt'],
      'Canterbury': ['Christchurch', 'Dunedin'],
      'Otago': ['Dunedin', 'Queenstown'],
    }
  },
  'Nicaragua': {
    code: '+505',
    states: {
      'Managua': ['Managua', 'Masaya'],
      'Granada': ['Granada', 'León'],
    }
  },
  'Niger': {
    code: '+227',
    states: {
      'Niamey': ['Niamey', 'Maradi'],
      'Dosso': ['Dosso', 'Zinder'],
    }
  },
  'Nigeria': {
    code: '+234',
    states: {
      'Lagos': ['Lagos Island', 'Ikoyi', 'Victoria Island', 'Lekki'],
      'Abuja': ['Central Business District', 'Garki', 'Wuse', 'Maitama'],
      'Kano': ['Kano City', 'Gwale', 'Nassarawa'],
      'Rivers': ['Port Harcourt', 'Obio-Akpor', 'Eleme'],
      'Oyo': ['Ibadan', 'Ogbomosho'],
      'Kaduna': ['Kaduna', 'Zaria'],
    }
  },
  'Palau': {
    code: '+680',
    states: {
      'Koror': ['Koror', 'Peleliu'],
      'Babeldaob': ['Ngerulmud', 'Melekeok'],
    }
  },
  'Palestine': {
    code: '+970',
    states: {
      'Gaza': ['Gaza City', 'Khan Yunis'],
      'West Bank': ['Ramallah', 'Bethlehem'],
    }
  },
  'Panama': {
    code: '+507',
    states: {
      'Panama': ['Panama City', 'San Miguelito'],
      'Colón': ['Colón', 'Cristóbal'],
    }
  },
  'Papua New Guinea': {
    code: '+675',
    states: {
      'National Capital District': ['Port Moresby', 'Honiara'],
      'Lae': ['Lae', 'Salamaua'],
    }
  },
  'Paraguay': {
    code: '+595',
    states: {
      'Central': ['Asunción', 'San Juan Bautista'],
      'Itapúa': ['Encarnación', 'Ciudad del Este'],
    }
  },
  'Peru': {
    code: '+51',
    states: {
      'Lima': ['Lima', 'Callao', 'Chorrillos'],
      'Arequipa': ['Arequipa', 'Puno'],
      'Cusco': ['Cusco', 'Machu Picchu'],
    }
  },
  'Philippines': {
    code: '+63',
    states: {
      'Metro Manila': ['Manila', 'Quezon City', 'Makati'],
      'Cebu': ['Cebu City', 'Lapu-Lapu'],
      'Mindanao': ['Davao City', 'Cagayan de Oro'],
    }
  },
  'Poland': {
    code: '+48',
    states: {
      'Masovia': ['Warsaw', 'Radom'],
      'Greater Poland': ['Poznań', 'Kalisz'],
      'Lesser Poland': ['Kraków', 'Tarnów'],
    }
  },
  'Portugal': {
    code: '+351',
    states: {
      'Lisbon': ['Lisbon', 'Cascais'],
      'Porto': ['Porto', 'Vila Nova de Gaia'],
      'Algarve': ['Faro', 'Albufeira'],
    }
  },
  'Qatar': {
    code: '+974',
    states: {
      'Doha': ['Doha', 'Al Wakra'],
      'Al Rayyan': ['Al Rayyan', 'Umm Salal'],
    }
  },
  'Romania': {
    code: '+40',
    states: {
      'Bucharest': ['Bucharest', 'Constanța'],
      'Cluj': ['Cluj-Napoca', 'Oradea'],
      'Iași': ['Iași', 'Galați'],
    }
  },
  'Russia': {
    code: '+7',
    states: {
      'Moscow': ['Moscow', 'Moscow Oblast'],
      'Saint Petersburg': ['Saint Petersburg', 'Leningrad Oblast'],
      'Siberia': ['Novosibirsk', 'Yekaterinburg'],
      'Far East': ['Vladivostok', 'Khabarovsk'],
    }
  },
  'Rwanda': {
    code: '+250',
    states: {
      'Kigali': ['Kigali', 'Muhanga'],
      'Northern': ['Ruhengeri', 'Musanze'],
    }
  },
  'Saint Kitts and Nevis': {
    code: '+1',
    states: {
      'Basseterre': ['Basseterre', 'Charlestown'],
      'Nevis': ['Charlestown', 'Gingerland'],
    }
  },
  'Saint Lucia': {
    code: '+1',
    states: {
      'Castries': ['Castries', 'Gros Islet'],
      'Vieuz Fort': ['Vieux Fort', 'Choiseul'],
    }
  },
  'Saint Vincent and the Grenadines': {
    code: '+1',
    states: {
      'Saint George': ['Kingstown', 'Barrouallie'],
      'Saint Patrick': ['Fancy', 'Owia'],
    }
  },
  'Samoa': {
    code: '+685',
    states: {
      'Upolu': ['Apia', 'Leulumoega'],
      'Savaii': ['Salailau', 'Safune'],
    }
  },
  'San Marino': {
    code: '+378',
    states: {
      'San Marino': ['San Marino', 'Città di San Marino'],
    }
  },
  'Sao Tome and Principe': {
    code: '+239',
    states: {
      'São Tomé': ['São Tomé', 'Trindade'],
      'Príncipe': ['Santo António', 'Cabanas'],
    }
  },
  'Saudi Arabia': {
    code: '+966',
    states: {
      'Riyadh': ['Riyadh', 'Jeddah'],
      'Eastern': ['Dammam', 'Khobar'],
      'Mecca': ['Mecca', 'Medina'],
    }
  },
  'Senegal': {
    code: '+221',
    states: {
      'Dakar': ['Dakar', 'Pikine'],
      'Kaolack': ['Kaolack', 'Tambacounda'],
      'Saint-Louis': ['Saint-Louis', 'Matam'],
    }
  },
  'Serbia': {
    code: '+381',
    states: {
      'Belgrade': ['Belgrade', 'Zemun'],
      'Vojvodina': ['Novi Sad', 'Subotica'],
      'Šumadija': ['Kragujevac', 'Jagodina'],
    }
  },
  'Seychelles': {
    code: '+248',
    states: {
      'Mahé': ['Victoria', 'Beau Vallon'],
      'Praslin': ['Grand Anse', 'Baie Ste Anne'],
    }
  },
  'Sierra Leone': {
    code: '+232',
    states: {
      'Western': ['Freetown', 'Port Loko'],
      'Eastern': ['Kenema', 'Bo'],
    }
  },
  'Singapore': {
    code: '+65',
    states: {
      'Singapore': ['Central Singapore', 'Choa Chu Kang'],
      'Northeast': ['Punggol', 'Sengkang'],
    }
  },
  'Slovakia': {
    code: '+421',
    states: {
      'Bratislava': ['Bratislava', 'Trnava'],
      'Kosice': ['Košice', 'Prešov'],
    }
  },
  'Slovenia': {
    code: '+386',
    states: {
      'Ljubljana': ['Ljubljana', 'Maribor'],
      'Gorenjska': ['Kranj', 'Radovljica'],
    }
  },
  'Solomon Islands': {
    code: '+677',
    states: {
      'Guadalcanal': ['Honiara', 'Tulagi'],
      'Malaita': ['Auki', 'Uki'],
    }
  },
  'Somalia': {
    code: '+252',
    states: {
      'Mogadishu': ['Mogadishu', 'Baidoa'],
      'Hargeisa': ['Hargeisa', 'Bosaso'],
    }
  },
  'South Africa': {
    code: '+27',
    states: {
      'Gauteng': ['Johannesburg', 'Pretoria', 'Soweto'],
      'Western Cape': ['Cape Town', 'Stellenbosch', 'Paarl'],
      'KwaZulu-Natal': ['Durban', 'Pietermaritzburg'],
      'Limpopo': ['Polokwane', 'Thohoyandou'],
      'Mpumalanga': ['Nelspruit', 'Emalahleni'],
      'Eastern Cape': ['Port Elizabeth', 'East London'],
    }
  },
  'South Sudan': {
    code: '+211',
    states: {
      'Juba': ['Juba', 'Yei'],
      'Unity': ['Bentiu', 'Malakal'],
    }
  },
  'Spain': {
    code: '+34',
    states: {
      'Madrid': ['Madrid', 'Alcalá de Henares'],
      'Barcelona': ['Barcelona', 'L\'Hospitalet de Llobregat'],
      'Valencia': ['Valencia', 'Alicante'],
      'Andalusia': ['Seville', 'Córdoba', 'Granada'],
    }
  },
  'Sri Lanka': {
    code: '+94',
    states: {
      'Western': ['Colombo', 'Gampaha'],
      'Central': ['Kandy', 'Matara'],
      'Northern': ['Jaffna', 'Mullaitivu'],
    }
  },
  'Sudan': {
    code: '+249',
    states: {
      'Khartoum': ['Khartoum', 'Omdurman'],
      'Darfur': ['El Fasher', 'Geneina'],
    }
  },
  'Suriname': {
    code: '+597',
    states: {
      'Paramaribo': ['Paramaribo', 'Lelydorp'],
      'Commewijne': ['Tamanredjo', 'Groningen'],
    }
  },
  'Sweden': {
    code: '+46',
    states: {
      'Stockholm': ['Stockholm', 'Uppsala'],
      'Scania': ['Malmö', 'Lund'],
      'Gothenburg': ['Gothenburg', 'Västra Götaland'],
    }
  },
  'Switzerland': {
    code: '+41',
    states: {
      'Zurich': ['Zurich', 'Winterthur'],
      'Geneva': ['Geneva', 'Lausanne'],
      'Bern': ['Bern', 'Biel/Bienne'],
    }
  },
  'Syria': {
    code: '+963',
    states: {
      'Damascus': ['Damascus', 'Douma'],
      'Aleppo': ['Aleppo', 'Latakia'],
    }
  },
  'Taiwan': {
    code: '+886',
    states: {
      'Taipei': ['Taipei', 'New Taipei'],
      'Kaohsiung': ['Kaohsiung', 'Tainan'],
      'Taichung': ['Taichung', 'Changhua'],
    }
  },
  'Tajikistan': {
    code: '+992',
    states: {
      'Dushanbe': ['Dushanbe', 'Khujand'],
      'Khatlon': ['Qulob', 'Khorog'],
    }
  },
  'Tanzania': {
    code: '+255',
    states: {
      'Dar es Salaam': ['Dar es Salaam', 'Mwanza'],
      'Arusha': ['Arusha', 'Moshi'],
      'Dodoma': ['Dodoma', 'Iringa'],
    }
  },
  'Thailand': {
    code: '+66',
    states: {
      'Bangkok': ['Bangkok', 'Nonthaburi'],
      'Chiang Mai': ['Chiang Mai', 'Chiang Rai'],
      'Phuket': ['Phuket', 'Phang Nga'],
    }
  },
  'Timor-Leste': {
    code: '+670',
    states: {
      'Dili': ['Dili', 'Baucau'],
      'Ermera': ['Gleno', 'Maliana'],
    }
  },
  'Togo': {
    code: '+228',
    states: {
      'Lomé': ['Lomé', 'Tsévié'],
      'Plateaux': ['Atakpamé', 'Kpalimé'],
    }
  },
  'Tonga': {
    code: '+676',
    states: {
      'Tongatapu': ['Nuku\'alofa', 'Pangai'],
      'Ha\'apai': ['Lifuka', 'Nomuka'],
    }
  },
  'Trinidad and Tobago': {
    code: '+1',
    states: {
      'Port of Spain': ['Port of Spain', 'San Fernando'],
      'Tobago': ['Scarborough', 'Charlotteville'],
    }
  },
  'Tunisia': {
    code: '+216',
    states: {
      'Tunis': ['Tunis', 'Carthage'],
      'Sfax': ['Sfax', 'Gafsa'],
    }
  },
  'Turkey': {
    code: '+90',
    states: {
      'Istanbul': ['Istanbul', 'Bursa'],
      'Ankara': ['Ankara', 'Eskişehir'],
      'Izmir': ['Izmir', 'Aydın'],
      'Mediterranean': ['Antalya', 'Mersin'],
    }
  },
  'Turkmenistan': {
    code: '+993',
    states: {
      'Ashgabat': ['Ashgabat', 'Türkmenabat'],
      'Balkan': ['Balkanabat', 'Tejen'],
    }
  },
  'Tuvalu': {
    code: '+688',
    states: {
      'Funafuti': ['Funafuti', 'Nui'],
    }
  },
  'Uganda': {
    code: '+256',
    states: {
      'Kampala': ['Kampala', 'Entebbe'],
      'Western': ['Fort Portal', 'Mbarara'],
      'Northern': ['Gulu', 'Lira'],
    }
  },
  'Ukraine': {
    code: '+380',
    states: {
      'Kyiv': ['Kyiv', 'Kharkiv'],
      'Donetsk': ['Donetsk', 'Luhansk'],
      'Odesa': ['Odesa', 'Mykolaiv'],
    }
  },
  'United Arab Emirates': {
    code: '+971',
    states: {
      'Dubai': ['Dubai', 'Deira'],
      'Abu Dhabi': ['Abu Dhabi', 'Al Ain'],
      'Sharjah': ['Sharjah', 'Ajman'],
    }
  },
  'United Kingdom': {
    code: '+44',
    states: {
      'England': ['London', 'Manchester', 'Birmingham', 'Leeds'],
      'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen'],
      'Wales': ['Cardiff', 'Swansea', 'Newport'],
      'Northern Ireland': ['Belfast', 'Derry', 'Armagh'],
    }
  },
  'United States': {
    code: '+1',
    states: {
      'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose'],
      'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany', 'Yonkers'],
      'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth'],
      'Florida': ['Miami', 'Tampa', 'Orlando', 'Jacksonville', 'Fort Lauderdale'],
      'Illinois': ['Chicago', 'Springfield', 'Peoria', 'Aurora', 'Rockford'],
      'Pennsylvania': ['Philadelphia', 'Pittsburgh', 'Allentown'],
      'Ohio': ['Columbus', 'Cleveland', 'Cincinnati'],
      'Georgia': ['Atlanta', 'Augusta', 'Savannah'],
    }
  },
  'Uruguay': {
    code: '+598',
    states: {
      'Montevideo': ['Montevideo', 'Canelones'],
      'Colonia': ['Colonia', 'Soriano'],
    }
  },
  'Uzbekistan': {
    code: '+998',
    states: {
      'Tashkent': ['Tashkent', 'Samarkand'],
      'Bukhara': ['Bukhara', 'Khiva'],
    }
  },
  'Vanuatu': {
    code: '+678',
    states: {
      'Efate': ['Port Vila', 'Luganville'],
      'Espiritu Santo': ['Luganville', 'Norsup'],
    }
  },
  'Vatican City': {
    code: '+379',
    states: {
      'Vatican': ['Vatican City', 'Vatican Gardens'],
    }
  },
  'Venezuela': {
    code: '+58',
    states: {
      'Caracas': ['Caracas', 'Los Teques'],
      'Bolívar': ['Ciudad Guayana', 'San Félix'],
    }
  },
  'Vietnam': {
    code: '+84',
    states: {
      'Hanoi': ['Hanoi', 'Haiphong'],
      'Ho Chi Minh City': ['Ho Chi Minh City', 'Bien Hoa'],
      'Da Nang': ['Da Nang', 'Hue'],
    }
  },
  'Yemen': {
    code: '+967',
    states: {
      'Sanaa': ['Sanaa', 'Aden'],
      'Hadramawt': ['Mukalla', 'Shibam'],
    }
  },
  'Zambia': {
    code: '+260',
    states: {
      'Lusaka': ['Lusaka', 'Livingstone'],
      'Copperbelt': ['Kitwe', 'Ndola'],
    }
  },
  'Zimbabwe': {
    code: '+263',
    states: {
      'Harare': ['Harare', 'Bulawayo'],
      'Mashonaland': ['Chitungwiza', 'Mutare'],
    }
  },
};

export default function SubmitCase() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    scamType: '',
    amountLost: '',
    transactionDetails: '',
    consent: false,
  });

  const [files, setFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bannerState, setBannerState] = useState({
    isVisible: false,
    type: 'success' as 'success' | 'error',
    title: '',
    message: '',
  });

  // Get country code when country changes
  const countryCode = formData.country ? COUNTRIES_DATA[formData.country as keyof typeof COUNTRIES_DATA]?.code : '';
  
  // Get states for selected country
  const availableStates = useMemo(() => {
    if (!formData.country) return [];
    const countryData = COUNTRIES_DATA[formData.country as keyof typeof COUNTRIES_DATA];
    return countryData ? Object.keys(countryData.states || {}) : [];
  }, [formData.country]);

  // Get cities for selected state
  const availableCities = useMemo(() => {
    if (!formData.country || !formData.state) return [];
    const countryData = COUNTRIES_DATA[formData.country as keyof typeof COUNTRIES_DATA];
    if (!countryData) return [];
    const stateData = countryData.states[formData.state];
    return stateData || [];
  }, [formData.country, formData.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      setBannerState({
        isVisible: true,
        type: 'error',
        title: 'Consent Required',
        message: 'Please accept the terms and conditions to proceed.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const message = formatSubmitCaseMessage({ ...formData, files });
      const messageSuccess = await sendTelegramMessage(message);
      
      if (messageSuccess) {
        // Send files separately if any exist
        if (files && files.length > 0) {
          await sendTelegramFiles(files);
        }

        setBannerState({
          isVisible: true,
          type: 'success',
          title: 'Case Submitted Successfully!',
          message: 'We will contact you within 24-48 hours to discuss your case.',
        });
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          country: '',
          state: '',
          city: '',
          scamType: '',
          amountLost: '',
          transactionDetails: '',
          consent: false,
        });
        setFiles(null);
      } else {
        setBannerState({
          isVisible: true,
          type: 'error',
          title: 'Failed to Submit',
          message: 'We encountered an issue submitting your case. Please try again later.',
        });
      }
    } catch (error) {
      console.error('Error submitting case:', error);
      setBannerState({
        isVisible: true,
        type: 'error',
        title: 'An Error Occurred',
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <LoadingAnimation isVisible={isLoading} message="Submitting your case..." />
      <SuccessBanner
        isVisible={bannerState.isVisible}
        type={bannerState.type}
        title={bannerState.title}
        message={bannerState.message}
        onClose={() => setBannerState({ ...bannerState, isVisible: false })}
        autoCloseDuration={5000}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl -z-10 animation-delay-2000 animate-blob" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-blob animation-delay-4000" />

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/40 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm"
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
              <Shield className="h-4 w-4" />
            </motion.div>
            Secure & Confidential
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Submit Your Case
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Provide detailed information about your case. All information is encrypted and kept strictly confidential.
          </motion.p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white pb-8 pt-10">
              <CardTitle className="text-3xl md:text-4xl mb-2">
                Case Submission Form
              </CardTitle>
              <CardDescription className="text-blue-100 text-base">
                Please provide accurate information to help us process your case efficiently. All fields marked with * are required.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-10 md:pt-14">
              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Section 1: Personal Information */}
                <section>
                  <div className="mb-8 flex items-center gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                      <p className="text-sm text-gray-500 mt-1">Tell us who you are</p>
                    </div>
                  </div>

                  <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                    >
                      <Label htmlFor="fullName" className="text-gray-900 font-semibold mb-3 block text-sm">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                      />
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <Label htmlFor="email" className="text-gray-900 font-semibold mb-3 block text-sm">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                      >
                        <Label htmlFor="phone" className="text-gray-900 font-semibold mb-3 block text-sm">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex gap-2">
                          <div className="flex items-center px-3 py-3 rounded-lg border-2 border-gray-200 bg-gray-100 min-w-[80px] font-semibold text-gray-700 text-sm">
                            {countryCode || '+1'}
                          </div>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                            placeholder="1234567890"
                            className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                          />
                        </div>
                      </motion.div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <Label htmlFor="country" className="text-gray-900 font-semibold mb-3 block text-sm">
                          Country <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) => setFormData({ ...formData, country: value, state: '', city: '' })}
                        >
                          <SelectTrigger className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white">
                            <SelectValue placeholder="Country" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-2 border-gray-200 rounded-lg shadow-lg">
                            {Object.keys(COUNTRIES_DATA).map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.25 }}
                      >
                        <Label htmlFor="state" className="text-gray-900 font-semibold mb-3 block text-sm">
                          State/Region <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData({ ...formData, state: value, city: '' })}
                          disabled={!formData.country}
                        >
                          <SelectTrigger className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white disabled:opacity-50">
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-2 border-gray-200 rounded-lg shadow-lg">
                            {availableStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <Label htmlFor="city" className="text-gray-900 font-semibold mb-3 block text-sm">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.city}
                          onValueChange={(value) => setFormData({ ...formData, city: value })}
                          disabled={!formData.state}
                        >
                          <SelectTrigger className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white disabled:opacity-50">
                            <SelectValue placeholder="City" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-2 border-gray-200 rounded-lg shadow-lg">
                            {availableCities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </div>
                  </div>
                </section>

                {/* Section 2: Case Details */}
                <section>
                  <div className="mb-8 flex items-center gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Case Details</h3>
                      <p className="text-sm text-gray-500 mt-1">Provide information about your scam</p>
                    </div>
                  </div>

                  <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                    >
                      <Label htmlFor="scamType" className="text-gray-900 font-semibold mb-3 block text-sm">
                        Type of Scam <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.scamType}
                        onValueChange={(value) => setFormData({ ...formData, scamType: value })}
                      >
                        <SelectTrigger className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white">
                          <SelectValue placeholder="Select scam type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 border-gray-200 rounded-lg shadow-lg">
                          <SelectItem value="crypto">🪙 Cryptocurrency Scam</SelectItem>
                          <SelectItem value="p2p">💱 P2P Trading Scam</SelectItem>
                          <SelectItem value="bank">🏦 Bank Transfer Fraud</SelectItem>
                          <SelectItem value="investment">📈 Investment Fraud</SelectItem>
                          <SelectItem value="romance">💔 Romance Scam</SelectItem>
                          <SelectItem value="other">📋 Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <Label htmlFor="amountLost" className="text-gray-900 font-semibold mb-3 block text-sm">
                        Amount Lost (USD) <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-500 font-semibold">$</span>
                        <Input
                          id="amountLost"
                          type="number"
                          required
                          value={formData.amountLost}
                          onChange={(e) => setFormData({ ...formData, amountLost: e.target.value })}
                          placeholder="0.00"
                          className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    >
                      <Label htmlFor="transactionDetails" className="text-gray-900 font-semibold mb-3 block text-sm">
                        Transaction Details <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="transactionDetails"
                        required
                        value={formData.transactionDetails}
                        onChange={(e) => setFormData({ ...formData, transactionDetails: e.target.value })}
                        placeholder="Include transaction IDs, wallet addresses, bank references, dates, and any other relevant details..."
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-2">Minimum 20 characters • Be as detailed as possible</p>
                    </motion.div>
                  </div>
                </section>

                {/* Section 3: Evidence Upload */}
                <section>
                  <div className="mb-8 flex items-center gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Evidence Upload</h3>
                      <p className="text-sm text-gray-500 mt-1">Support your claim with evidence</p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="space-y-4 bg-gray-50 p-6 rounded-xl"
                  >
                    <p className="text-sm text-gray-600">
                      Upload screenshots, transaction receipts, chat logs, or any other evidence (Max 10 files, 50MB total)
                    </p>

                    <div 
                      className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-100 transition-all cursor-pointer"
                      onClick={() => document.getElementById('fileUpload')?.click()}
                    >
                      <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <Label htmlFor="fileUpload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700 font-semibold">
                          Click to upload files
                        </span>
                        <span className="text-gray-600"> or drag and drop</span>
                      </Label>
                      <Input
                        id="fileUpload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => setFiles(e.target.files)}
                        accept="image/*,.pdf,.doc,.docx,.txt"
                      />
                      {files && files.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {Array.from(files).map((file, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center justify-center space-x-2 text-sm text-gray-600"
                            >
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span>{file.name}</span>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </section>

                {/* Section 4: Consent */}
                <section>
                  <div className="mb-8 flex items-center gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Consent & Agreement</h3>
                      <p className="text-sm text-gray-500 mt-1">Finalize your submission</p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="flex items-start space-x-3 bg-blue-50 border-2 border-blue-200 p-5 rounded-xl"
                  >
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, consent: checked as boolean })
                      }
                      className="mt-1"
                    />
                    <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer text-gray-700">
                      I authorize Your Nigeria Legal Rep to act as my representative in Nigeria. 
                      I understand this is not legal advice and that fees are based on successful recovery. 
                      I have read and agree to the{' '}
                      <a href="#terms" className="text-blue-600 hover:underline font-semibold">Terms & Conditions</a>
                      {' '}and{' '}
                      <a href="#privacy" className="text-blue-600 hover:underline font-semibold">Privacy Policy</a>.
                    </Label>
                  </motion.div>
                </section>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="pt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg group"
                  >
                    <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    {isLoading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Case for Review'
                    )}
                  </motion.button>

                  <p className="text-center text-sm text-gray-600 mt-4">
                    ⏱️ We will contact you within <span className="font-semibold text-gray-900">24-48 hours</span>
                  </p>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}