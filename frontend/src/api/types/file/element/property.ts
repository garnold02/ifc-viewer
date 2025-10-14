export type Property = NodeProperty | LeafProperty;

export type NodeProperty = PropertyBase & {
  type: "node";
  children: Property[];
};

export type LeafProperty = PropertyBase & {
  type: "leaf";
  unit: string | null;
} & LeafPropertyValue;

export type MeasureType =
  | "IfcAbsorbedDoseMeasure"
  | "IfcAccelerationMeasure"
  | "IfcAmountOfSubstanceMeasure"
  | "IfcAngularVelocityMeasure"
  | "IfcAreaDensityMeasure"
  | "IfcAreaMeasure"
  | "IfcCompoundPlaneAngleMeasure"
  | "IfcContextDependentMeasure"
  | "IfcCountMeasure"
  | "IfcCurvatureMeasure"
  | "IfcCurveMeasureSelect"
  | "IfcDerivedMeasureValue"
  | "IfcDescriptiveMeasure"
  | "IfcDoseEquivalentMeasure"
  | "IfcDynamicViscosityMeasure"
  | "IfcElectricCapacitanceMeasure"
  | "IfcElectricChargeMeasure"
  | "IfcElectricConductanceMeasure"
  | "IfcElectricCurrentMeasure"
  | "IfcElectricResistanceMeasure"
  | "IfcElectricVoltageMeasure"
  | "IfcEnergyMeasure"
  | "IfcForceMeasure"
  | "IfcFrequencyMeasure"
  | "IfcHeatFluxDensityMeasure"
  | "IfcHeatingValueMeasure"
  | "IfcIlluminanceMeasure"
  | "IfcInductanceMeasure"
  | "IfcIntegerCountRateMeasure"
  | "IfcIonConcentrationMeasure"
  | "IfcIsothermalMoistureCapacityMeasure"
  | "IfcKinematicViscosityMeasure"
  | "IfcLengthMeasure"
  | "IfcLinearForceMeasure"
  | "IfcLinearMomentMeasure"
  | "IfcLinearStiffnessMeasure"
  | "IfcLinearVelocityMeasure"
  | "IfcLuminousFluxMeasure"
  | "IfcLuminousIntensityDistributionMeasure"
  | "IfcLuminousIntensityMeasure"
  | "IfcMagneticFluxDensityMeasure"
  | "IfcMagneticFluxMeasure"
  | "IfcMassDensityMeasure"
  | "IfcMassFlowRateMeasure"
  | "IfcMassMeasure"
  | "IfcMassPerLengthMeasure"
  | "IfcMeasureValue"
  | "IfcModulusOfElasticityMeasure"
  | "IfcModulusOfLinearSubgradeReactionMeasure"
  | "IfcModulusOfRotationalSubgradeReactionMeasure"
  | "IfcModulusOfSubgradeReactionMeasure"
  | "IfcMoistureDiffusivityMeasure"
  | "IfcMolecularWeightMeasure"
  | "IfcMomentOfInertiaMeasure"
  | "IfcMonetaryMeasure"
  | "IfcNonNegativeLengthMeasure"
  | "IfcNormalisedRatioMeasure"
  | "IfcNumericMeasure"
  | "IfcPHMeasure"
  | "IfcPlanarForceMeasure"
  | "IfcPlaneAngleMeasure"
  | "IfcPositiveLengthMeasure"
  | "IfcPositivePlaneAngleMeasure"
  | "IfcPositiveRatioMeasure"
  | "IfcPowerMeasure"
  | "IfcPressureMeasure"
  | "IfcRadioActivityMeasure"
  | "IfcRatioMeasure"
  | "IfcRotationalFrequencyMeasure"
  | "IfcRotationalMassMeasure"
  | "IfcRotationalStiffnessMeasure"
  | "IfcSectionalAreaIntegralMeasure"
  | "IfcSectionModulusMeasure"
  | "IfcShearModulusMeasure"
  | "IfcSolidAngleMeasure"
  | "IfcSoundPowerLevelMeasure"
  | "IfcSoundPowerMeasure"
  | "IfcSoundPressureLevelMeasure"
  | "IfcSoundPressureMeasure"
  | "IfcSpecificHeatCapacityMeasure"
  | "IfcTemperatureGradientMeasure"
  | "IfcTemperatureRateOfChangeMeasure"
  | "IfcThermalAdmittanceMeasure"
  | "IfcThermalConductivityMeasure"
  | "IfcThermalExpansionCoefficientMeasure"
  | "IfcThermalResistanceMeasure"
  | "IfcThermalTransmittanceMeasure"
  | "IfcThermodynamicTemperatureMeasure"
  | "IfcTimeMeasure"
  | "IfcTorqueMeasure"
  | "IfcVaporPermeabilityMeasure"
  | "IfcVolumeMeasure"
  | "IfcVolumetricFlowRateMeasure"
  | "IfcWarpingConstantMeasure"
  | "IfcWarpingMomentMeasure";

type PropertyBase = {
  name: string;
  description: string | null;
};

type LeafPropertyValue =
  | LeafPropertyValueBoolean
  | LeafPropertyValueElement
  | LeafPropertyValueMeasure
  | LeafPropertyValueNull
  | LeafPropertyValueNumber
  | LeafPropertyValueString;

type LeafPropertyValueBoolean = {
  semantics: "boolean";
  value: boolean;
};

type LeafPropertyValueElement = {
  semantics: "element";
  value: number;
};

type LeafPropertyValueMeasure = {
  semantics: MeasureType;
  value: number;
};

type LeafPropertyValueNull = {
  semantics: "null";
  value: null;
};

type LeafPropertyValueNumber = {
  semantics: "number";
  value: number;
};

type LeafPropertyValueString = {
  semantics: "string";
  value: string;
};
