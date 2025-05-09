export default class CssPosition {
    static returnPosition(css_instruction: string) {
        switch(css_instruction) {
            case "Haut gauche":
                return {justifyContent: "start", alignItems: "start"}

            case "Haut centre":
                return {justifyContent: "center", alignItems: "start"}

            case "Haut droit":
          
                return {justifyContent: "end", alignItems: "start"}
     
            case "Centre gauche":
                return {justifyContent: "start", alignItems: "center"}
          
            case "Centre centre":
                return {justifyContent: "center", alignItems: "center"}
            
            case "Centre droit":
                return {justifyContent: "end", alignItems: "center"}
            
            case "Bas gauche":
                return {justifyContent: "start" , alignItems: "end"}
             
            case "Bas centre":
                return {justifyContent: "center", alignItems: "end"}
          
            case "Bas droit":
                return {justifyContent: "end", alignItems: "end"}
             
            default:
                return {justifyContent: "start", alignItems: "start"}
        }
    }
  } 