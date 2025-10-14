import ifcopenshell as ios
from typing import Any, Tuple
import unit_utils


class IfcElementSignature:
    type: str
    id: int
    name: str | None


    def __init__(self, type: str, id: int, name: str | None):
        self.type = type
        self.id = id
        self.name = name


class IfcElement:
    _entity: ios.entity_instance
    _global_units: list[dict] | None


    def __init__(self, entity: ios.entity_instance, global_units: list[dict] | None = None):
        self._entity = entity
        self._global_units = global_units
    

    def set_global_units(self, global_units: list[dict] | None):
        self._global_units = global_units
    

    def get_signature(self) -> IfcElementSignature:
        name: str | None = None

        try:
            name = self._entity.Name
        except:
            pass

        if name != None and len(name) == 0:
            name = None

        return IfcElementSignature(
            self._entity.is_a(),
            self._entity.id(),
            name,
        )
    

    def _transform_value(self, key: str, value: Any) -> dict:
        if value == None:
            return {
                "name": key,
                "description": None,
                "type": "leaf",
                "semantics": "null",
                "unit": None,
                "value": None,
            }

        elif (
            (isinstance(value, float) or isinstance(value, int))
            and not isinstance(value, bool)
        ):
            return {
                "name": key,
                "description": None,
                "type": "leaf",
                "semantics": "number",
                "unit": None,
                "value": value,
            }
        
        elif isinstance(value, str):
            return {
                "name": key,
                "description": None,
                "type": "leaf",
                "semantics": "string",
                "unit": None,
                "value": value,
            }
        
        elif isinstance(value, bool):
            return {
                "name": key,
                "description": None,
                "type": "leaf",
                "semantics": "boolean",
                "unit": None,
                "value": value,
            }
        
        elif isinstance(value, ios.entity_instance):
            if value.is_entity():
                return {
                    "name": key,
                    "description": None,
                    "type": "leaf",
                    "semantics": "element",
                    "unit": None,
                    "value": value.id(),
                }
            else:
                return self._transform_value(key, value.wrappedValue)
        
        elif isinstance(value, tuple):
            return {
                "name": key,
                "description": None,
                "type": "node",
                "children": [
                    self._transform_value(f"{ordinal + 1}.", attr)
                    for ordinal, attr
                    in enumerate(value)
                ]
            }
        
        else:
            # NOTE: this shouldn't happen
            raise Exception()
    

    def _transform_property(self, value: ios.entity_instance) -> dict:
        name: str = value.Name
        description: str = value.Description

        if value.is_a("IfcComplexProperty"):
            name: str = value.UsageName
            children: list[ios.entity_instance] = []

            for prop in value.HasProperties:
                children.append(self._transform_property(prop))

            return {
                "name": name,
                "description": description,
                "type": "node",
                "children": children,
            }
        
        # handle subtypes of `IfcSimpleProperty`

        elif value.is_a("IfcPropertyBoundedValue"):
            # TODO: handle `IfcPropertyBoundedValue`
            raise Exception()
        
        elif value.is_a("IfcPropertyEnumeratedValue"):
            # TODO: handle `IfcPropertyEnumeratedValue`
            raise Exception()
        
        elif value.is_a("IfcPropertyListValue"):
            # TODO: handle `IfcPropertyListValue`
            raise Exception()
        
        elif value.is_a("IfcPropertyReferenceValue"):
            # TODO: handle `IfcPropertyReferenceValue`
            raise Exception()
        
        elif value.is_a("IfcPropertySingleValue"):
            wrapped = None

            if value.NominalValue != None:
                wrapped = value.NominalValue.wrappedValue
            
            transformed = self._transform_value(name, wrapped)
            
            if (
                (isinstance(wrapped, int) or isinstance(wrapped, float))
                and not isinstance(wrapped, bool)
            ):
                transformed["semantics"] = value.NominalValue.is_a()

            transformed["description"] = description
            transformed["unit"] = IfcElement(value.Unit, self._global_units).resolve_unit(
                value.NominalValue.is_a(),
            )

            return transformed
        
        elif value.is_a("IfcPropertyTableValue"):
            # TODO: handle `IfcPropertyTableValue`
            raise Exception()
        
        else:
            # NOTE: this shouldn't happen
            raise Exception()


    def _transform_quantity(self, value: ios.entity_instance) -> dict:
        name: str = value.Name
        description: str = value.Description

        if value.is_a("IfcPhysicalComplexQuantity"):
            # TODO: handle `IfcPhysicalComplexQuantity`
            raise Exception()
        
        # handle subtypes of `IfcPhysicalSimpleQuantity`
        
        elif value.is_a("IfcQuantityArea"):
            unit = IfcElement(value.Unit, self._global_units).resolve_unit(
                "IfcAreaMeasure",
            )
            
            return {
                "name": name,
                "description": description,
                "type": "leaf",
                "semantics": "IfcAreaMeasure",
                "unit": unit,
                "value": value.AreaValue,
            }
        
        elif value.is_a("IfcQuantityCount"):
            unit = IfcElement(value.Unit, self._global_units).resolve_unit(
                "IfcCountMeasure",
            )
            
            return {
                "name": name,
                "description": description,
                "type": "leaf",
                "semantics": "IfcCountMeasure",
                "unit": unit,
                "value": value.CountValue
            }
        
        elif value.is_a("IfcQuantityLength"):
            unit = IfcElement(value.Unit, self._global_units).resolve_unit(
                "IfcLengthMeasure",
            )
            
            return {
                "name": name,
                "description": description,
                "type": "leaf",
                "semantics": "IfcLengthMeasure",
                "unit": unit,
                "value": value.LengthValue
            }
        
        elif value.is_a("IfcQuantityTime"):
            unit = IfcElement(value.Unit, self._global_units).resolve_unit(
                "IfcTimeMeasure",
            )
            
            return {
                "name": name,
                "description": description,
                "type": "leaf",
                "meaning": "IfcTimeMeasure",
                "unit": unit,
                "value": value.TimeValue
            }
        
        elif value.is_a("IfcQuantityVolume"):
            unit = IfcElement(value.Unit, self._global_units).resolve_unit(
                "IfcVolumeMeasure",
            )
            
            return {
                "name": name,
                "description": description,
                "type": "leaf",
                "semantics": "IfcVolumeMeasure",
                "unit": unit,
                "value": value.VolumeValue
            }
        
        elif value.is_a("IfcQuantityWeight"):
            unit = IfcElement(value.Unit, self._global_units).resolve_unit(
                "IfcWeightMeasure",
            )
            
            return {
                "name": name,
                "description": description,
                "type": "leaf",
                "semantics": "IfcWeightMeasure",
                "unit": unit,
                "value": value.WeightValue
            }
        
        else:
            # NOTE: this shouldn't happen
            raise Exception()
    

    def _transform_builtin_property(
        self,
        value: ios.entity_instance,
        name: str,
        semantics: str,
        measure: str | None,
    ) -> dict:
        resolved_value = getattr(value, name, None)
        unit: str | None = None

        if measure != None and resolved_value != None:
            unit = IfcElement(None, self._global_units).resolve_unit(measure)

        return {
            "name": name,
            "description": None,
            "type": "leaf",
            "semantics": semantics if resolved_value != None else "null",
            "unit": unit,
            "value": resolved_value,
        }
    

    def _transform_property_set(self, value: ios.entity_instance) -> dict:
        name: str = value.Name
        properties: list[dict] = []

        if value.is_a("IfcDoorLiningProperties"):
            properties.append(self._transform_builtin_property(
                value,
                "LiningDepth",
                "IfcPositiveLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "LiningThickness",
                "IfcNonNegativeLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "ThresholdDepth",
                "IfcPositiveLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "ThresholdThickness",
                "IfcNonNegativeLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "TransomOffset",
                "IfcLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "LiningOffset",
                "IfcLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "ThresholdOffset",
                "IfcLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "CasingThickness",
                "IfcPositiveLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "CasingDepth",
                "IfcPositiveLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "LiningToPanelOffsetX",
                "IfcLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "LiningToPanelOffsetY",
                "IfcLengthMeasure",
                "IfcLengthMeasure",
            ))

        elif value.is_a("IfcDoorPanelProperties"):
            properties.append(self._transform_builtin_property(
                value,
                "PanelDepth",
                "IfcPositiveLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "PanelOperation",
                "string",
                None,
            ))

            properties.append(self._transform_builtin_property(
                value,
                "PanelWidth",
                "IfcNormalisedRatioMeasure",
                None,
            ))

            properties.append(self._transform_builtin_property(
                value,
                "PanelPosition",
                "string",
                None,
            ))
        
        elif value.is_a("IfcPermeableCoveringProperties"):
            properties.append(self._transform_builtin_property(
                value,
                "OperationType",
                "string",
                None,
            ))

            properties.append(self._transform_builtin_property(
                value,
                "PanelPosition",
                "string",
                None,
            ))

            properties.append(self._transform_builtin_property(
                value,
                "FrameDepth",
                "IfcPositiveLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "FrameThickness",
                "IfcPositiveLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_value(
                "ShapeAspectStyle",
                value.ShapeAspectStyle,
            ))
        
        elif value.is_a("IfcReinforcementDefinitionProperties"):
            properties.append(self._transform_builtin_property(
                value,
                "DefinitionType",
                "string",
                None,
            ))

            properties.append({
                "name": "ReinforcementSectionDefinitions",
                "description": None,
                "type": "node",
                "children": [
                    {
                        "name": f"{i + 1}.",
                        "description": None,
                        "type": "node",
                        "children": [
                            self._transform_builtin_property(
                                inner,
                                "LongitudinalStartPosition",
                                "IfcLengthMeasure",
                                "IfcLengthMeasure",
                            ),
                            self._transform_builtin_property(
                                inner,
                                "LongitudinalEndPosition",
                                "IfcLengthMeasure",
                                "IfcLengthMeasure",
                            ),
                            self._transform_builtin_property(
                                inner,
                                "TransversePosition",
                                "IfcLengthMeasure",
                                "IfcLengthMeasure",
                            ),
                            self._transform_builtin_property(
                                inner,
                                "ReinforcementRole",
                                "string",
                                None,
                            ),
                            {
                                "name": "SectionDefinition",
                                "description": None,
                                "type": "node",
                                "children": [
                                    self._transform_builtin_property(
                                        inner.SectionDefinition,
                                        "SectionType",
                                        "string",
                                        None,
                                    ),
                                    {
                                        "name": "StartProfile",
                                        "description": None,
                                        "type": "node",
                                        "children": [
                                            self._transform_builtin_property(
                                                inner.SectionDefinition.StartProfile,
                                                "ProfileType",
                                                "string",
                                                None,
                                            ),
                                            self._transform_builtin_property(
                                                inner.SectionDefinition.StartProfile,
                                                "ProfileName",
                                                "string",
                                                None,
                                            ),
                                        ],
                                    },
                                    {
                                        "name": "EndProfile",
                                        "description": None,
                                        "type": "node",
                                        "children": [
                                            self._transform_builtin_property(
                                                inner.SectionDefinition.EndProfile,
                                                "ProfileType",
                                                "string",
                                                None,
                                            ),
                                            self._transform_builtin_property(
                                                inner.SectionDefinition.EndProfile,
                                                "ProfileName",
                                                "string",
                                                None,
                                            ),
                                        ],
                                    }
                                ],
                            },
                            {
                                "name": "CrossSectionReinforcementDefinitions",
                                "description": None,
                                "type": "node",
                                "children": [
                                    {
                                        "name": f"{j + 1}.",
                                        "description": None,
                                        "type": "node",
                                        "children": [
                                            self._transform_builtin_property(
                                                inner2,
                                                "TotalCrossSectionArea",
                                                "IfcAreaMeasure",
                                                "IfcAreaMeasure",
                                            ),
                                            self._transform_builtin_property(
                                                inner2,
                                                "SteelGrade",
                                                "string",
                                                None,
                                            ),
                                            self._transform_builtin_property(
                                                inner2,
                                                "BarSurface",
                                                "string",
                                                None,
                                            ),
                                            self._transform_builtin_property(
                                                inner2,
                                                "EffectiveDepth",
                                                "IfcLengthMeasure",
                                                "IfcLengthMeasure",
                                            ),
                                            self._transform_builtin_property(
                                                inner2,
                                                "NominalBarDiameter",
                                                "IfcPositiveLengthMeasure",
                                                "IfcLengthMeasure",
                                            ),
                                            self._transform_builtin_property(
                                                inner2,
                                                "BarCount",
                                                "IfcCountMeasure",
                                                None,
                                            ),
                                        ],
                                    }
                                    for j, inner2
                                    in enumerate(inner.CrossSectionReinforcementDefinitions)
                                ],
                            },
                        ],
                    }
                    for i, inner
                    in enumerate(value.ReinforcementSectionDefinitions)
                ],
            })
        
        elif value.is_a("IfcWindowLiningProperties"):
            properties.append(self._transform_builtin_property(
                value,
                "LiningThickness",
                "IfcNonNegativeLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "TransomThickness",
                "IfcNonNegativeLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "MullionThickness",
                "IfcNonNegativeLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "FirstTransomOffset",
                "IfcNormalisedRatioMeasure",
                None,
            ))

            properties.append(self._transform_builtin_property(
                value,
                "SecondTransomOffset",
                "IfcNormalisedRatioMeasure",
                None,
            ))

            properties.append(self._transform_builtin_property(
                value,
                "FirstMullionOffset",
                "IfcNormalisedRatioMeasure",
                None,
            ))

            properties.append(self._transform_builtin_property(
                value,
                "SecondMullionOffset",
                "IfcNormalisedRatioMeasure",
                None,
            ))

            properties.append(self._transform_builtin_property(
                value,
                "LiningOffset",
                "IfcLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "LiningToPanelOffsetX",
                "IfcLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "LiningToPanelOffsetY",
                "IfcLengthMeasure",
                "IfcLengthMeasure",
            ))
        
        elif value.is_a("IfcWindowPanelProperties"):
            properties.append(self._transform_builtin_property(
                value,
                "OperationType",
                "string",
                None,
            ))

            properties.append(self._transform_builtin_property(
                value,
                "PanelPosition",
                "string",
                None,
            ))

            properties.append(self._transform_builtin_property(
                value,
                "FrameDepth",
                "IfcPositiveLengthMeasure",
                "IfcLengthMeasure",
            ))

            properties.append(self._transform_builtin_property(
                value,
                "FrameThickness",
                "IfcPositiveLengthMeasure",
                "IfcLengthMeasure",
            ))

        elif value.is_a("IfcPropertySet"):
            for property in value.HasProperties:
                # `property` is an `IfcProperty`
                properties.append(self._transform_property(property))

        elif value.is_a("IfcElementQuantity"):
            for quantity in value.Quantities:
                properties.append(self._transform_quantity(quantity))
        
        else:
            # NOTE: this shouldn't happen
            raise Exception()
        
        return {
            "name": name,
            "description": None,
            "type": "node",
            "children": properties,
        }


    def get_property_tree(self) -> dict:
        # first, collect the element's regular attributes

        attrs: list[dict] = []

        for key, value in self._entity.get_info().items():
            if key == "type" or key == "id":
                continue
            
            attrs.append(self._transform_value(key, value))
        
        children: list[dict] = [{
            "name": "__attributes__",
            "description": None,
            "type": "node",
            "children": attrs,
        }]

        # then, look for property sets attached to the element's object type(s)

        pset_entities: list[ios.entity_instance] = []

        for rel in self._entity.file.by_type("IfcRelDefinesByType"):
            if self._entity in rel.RelatedObjects:
                type_entity: ios.entity_instance = rel.RelatingType
                psets = type_entity.HasPropertySets
                if psets != None:
                    for pset in psets:
                        if (
                            isinstance(pset, ios.entity_instance)
                            and pset.is_a("IfcPropertySetDefinition")
                        ):
                            pset_entities.append(pset)
                        else:
                            # NOTE: Maybe this can also be `IfcPropertySetDefinitionSelect`?
                            # the standard is very unclear on this...
                            raise Exception()

        
        # finally, discover all the property/quantity sets directly relating to this element

        for rel in self._entity.file.by_type("IfcRelDefinesByProperties"):
            if self._entity in rel.RelatedObjects:
                pset = rel.RelatingPropertyDefinition   

                if (
                    isinstance(pset, ios.entity_instance)
                    and pset.is_a("IfcPropertySetDefinition")
                ):
                    pset_entities.append(pset)
                else:
                    # TODO: `IfcPropertySetDefinitionSet` (find test file that has this)
                    raise Exception()
        
        # transform the collected property/quantity sets

        for pset in pset_entities:
            children.append(self._transform_property_set(pset))
        
        return {
            "name": "root",
            "description": None,
            "type": "node",
            "children": children,
        }
    

    def transform_unit(self) -> dict:
        if self._entity.is_a("IfcDerivedUnit"):
            pairs: list[Tuple[str, int]] = []

            for element in self._entity.Elements:
                unit = IfcElement(element.Unit, self._global_units).transform_unit()
                unit_name: str = unit["name"]
                exponent: int = element.Exponent

                # workaround for a *very* strange design decision at buildingSMART
                match unit_name:
                    case "m²":
                        unit_name = "m"
                        exponent *= 2

                    case "m³":
                        unit_name = "m"
                        exponent *= 3

                    case _:
                        pass
                
                if exponent != 0:
                    pairs.append((unit_name, exponent))

            pairs.sort(key=lambda x: (-x[1], x[0]))                        
            name = "⋅".join([
                pair[0] if pair[1] == 1 else f"{pair[0]}{unit_utils.exponent_shorthand(pair[1])}"
                for pair in pairs
            ])
            
            return {
                "measure": self._entity.UnitType,
                "name": name,
            }
        
        elif self._entity.is_a("IfcContextDependentUnit"):
            return {
                "measure": self._entity.UnitType,
                "name": unit_utils.misc_unit_name(self._entity.Name),
            }
        
        elif self._entity.is_a("IfcConversionBasedUnit"):
            return {
                "measure": self._entity.UnitType,
                "name": unit_utils.misc_unit_name(self._entity.Name),
            }
        
        elif self._entity.is_a("IfcSIUnit"):
            name = ""

            if self._entity.Prefix != None:
                name += unit_utils.si_prefix_shorthand(self._entity.Prefix)

            name += unit_utils.si_unit_shorthand(self._entity.Name)
            
            return {
                "measure": self._entity.UnitType,
                "name": name,
            }
        
        elif self._entity.is_a("IfcMonetaryUnit"):
            return {
                "measure": "MONEYUNIT",
                "name": self._entity.Currency
            }
        
        else:
            # NOTE: This shouldn't happen
            raise Exception()
    

    def resolve_unit(self, measure: str) -> str | None:
        if self._entity != None:
            return self.transform_unit()["name"]

        if self._global_units == None:
            return None
        
        resolved_unit = unit_utils.get_unit_from_measure(
            measure,
            self._global_units,
        )

        if resolved_unit == None:
            return None
        
        return resolved_unit["name"]
