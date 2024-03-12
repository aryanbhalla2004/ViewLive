// import * as fa from 'react-icons/fa';
// import * as ci from 'react-icons/ci';
// import * as gi from 'react-icons/gi';
// import * as bs from 'react-icons/bs';
// import * as tb from 'react-icons/tb';
// import * as ti from 'react-icons/ti';
// import * as wi from 'react-icons/wi';
// import * as im from 'react-icons/im';
// import * as md from 'react-icons/md';
// import * as go from 'react-icons/go';
// import * as io from 'react-icons/io';
// import * as fi from 'react-icons/fi';
// import * as hi from 'react-icons/hi';
// import * as si from 'react-icons/si';
// import * as ri from 'react-icons/ri';
// import * as ai from 'react-icons/ai';
// import * as bi from 'react-icons/bi';
// import * as di from 'react-icons/di';
// import * as fc from 'react-icons/fc';
// import * as gr from 'react-icons/gr';
// import * as io5 from 'react-icons/io5';
// import * as md5 from 'react-icons/md';
// import * as ri5 from 'react-icons/ri';
// import * as ti5 from 'react-icons/ti';
// import * as vsc from 'react-icons/vsc';
// import * as wi5 from 'react-icons/wi';
// import * as gi5 from 'react-icons/gi';
// import * as fa5 from 'react-icons/fa';
// import * as cg from 'react-icons/cg';
// import * as fc5 from 'react-icons/fc';
// import * as fi5 from 'react-icons/fi';
// import * as lu from 'react-icons/lu';
//import them all and use them as a object



const icons = {};

//make fuction that takes a icon name as a parameter and return the icon from the imports above so 
// example i call the fucntion getIcon then i pass CiWifiOn As the paramter and it returns the icon from 
// Ci.CiWifiOn

export const getIcon = (iconName) => {
  let str = splitOnCaps(iconName);
  let icon = icons[str];
  return icon[iconName];
}


// code a split on caps method
// example CiWifiOn => Ci.WifiOn

const splitOnCaps = (str) => {
  const split = str.split(/(?=[A-Z])/);
  return split[0].toLowerCase();
}


