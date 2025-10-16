def si_prefix_shorthand(prefix: str) -> str:
    match prefix:
        case "EXA":
            return "E"
        
        case "PETA":
            return "P"
        
        case "TERA":
            return "T"
        
        case "GIGA":
            return "G"
        
        case "MEGA":
            return "M"
        
        case "KILO":
            return "k"
        
        case "HECTO":
            return "h"
        
        case "DECA":
            return "da"
        
        case "DECI":
            return "d"
        
        case "CENTI":
            return "c"
        
        case "MILLI":
            return "m"
        
        case "MICRO":
            return "μ"
        
        case "NANO":
            return "n"
        
        case "PICO":
            return "p"
        
        case "FEMTO":
            return "f"
        
        case "ATTO":
            return "a"
        
        case _:
            return "?"


def si_unit_shorthand(unit: str) -> str:
    match unit:
        case "AMPERE":
            return "A"
        
        case "BECQUEREL":
            return "Bq"
        
        case "CANDELA":
            return "cd"
        
        case "COULOMB":
            return "C"
        
        case "CUBIC_METRE":
            return "m³"
        
        case "DEGREE_CELSIUS":
            return "°C"
        
        case "FARAD":
            return "F"
        
        case "GRAM":
            return "g"
        
        case "GRAY":
            return "Gy"
        
        case "HENRY":
            return "H"
        
        case "HERTZ":
            return "Hz"
        
        case "JOULE":
            return "J"
        
        case "KELVIN":
            return "K"
        
        case "LUMEN":
            return "lm"
        
        case "LUX":
            return "lx"
        
        case "METRE":
            return "m"
        
        case "MOLE":
            return "mol"
        
        case "NEWTON":
            return "N"
        
        case "OHM":
            return "Ω"
        
        case "PASCAL":
            return "Pa"
        
        case "RADIAN":
            return "rad"
        
        case "SECOND":
            return "s"
        
        case "SIEMENS":
            return "S"
        
        case "SIEVERT":
            return "Sv"
        
        case "SQUARE_METRE":
            return "m²"
        
        case "STERADIAN":
            return "sr"
        
        case "TESLA":
            return "T"
        
        case "VOLT":
            return "V"
        
        case "WATT":
            return "W"
        
        case "WEBER":
            return "Wb"
        
        case _:
            return "?"


def misc_unit_name(unit: str) -> str:
    match unit.upper():        
        case "INCH":
            return "in"
        
        case "FOOT":
            return "ft"
        
        case "YARD":
            return "yd"
        
        case "MILE":
            return "mi"
        
        case "SQUARE INCH":
            return "in²"

        case "SQUARE FOOT":
            return "ft²"
        
        case "SQUARE YARD":
            return "yd²"
        
        case "LITRE":
            return "l"
        
        case "FLUID ONCE UK":
            return "fl oz (UK)"
        
        case "FLUID OUNCE US":
            return "fl oz (US)"
        
        case "PINT UK":
            return "pt (UK)"
        
        case "PINT US":
            return "pt (US)"
        
        case "GALLON UK":
            return "gal (UK)"
        
        case "GALLON US":
            return "gal (US)"
        
        case "DEGREE":
            return "°"
        
        case "OUNCE":
            return "oz"
        
        case "POUND":
            return "lb"
        
        case "TON UK":
            return "ton (UK)"
        
        case "TON US":
            return "ton (US)"
        
        case "LBF":
            return "lbf"
        
        case "KIP":
            return "kip"
        
        case "PSI":
            return "psi"
        
        case "KSI":
            return "ksi"
        
        case "MINUTE":
            return "min"
        
        case "HOUR":
            return "hr"
        
        case "DAY":
            return "day"
        
        case "BTU":
            return "btu"
        
        case _:
            return unit


def exponent_shorthand(exponent: int) -> str:
    result = ""

    for chr in str(exponent):
        match chr:
            case "-":
                result += "⁻"
            
            case "0":
                result += "⁰"
            
            case "1":
                result += "¹"
            
            case "2":
                result += "²"
            
            case "3":
                result += "³"
            
            case "4":
                result += "⁴"
            
            case "5":
                result += "⁵"
            
            case "6":
                result += "⁶"
            
            case "7":
                result += "⁷"
            
            case "8":
                result += "⁸"
            
            case "9":
                result += "⁹"
            
            case _:
                result += "?"

    return result


def get_unit_from_measure(measure: str, units: list[dict]) -> dict | None:
    type = measure.removeprefix("Ifc").removesuffix("Measure").upper() + "UNIT"
    
    for unit in units:
        if unit["measure"] == type:
            return unit
    
    return None
