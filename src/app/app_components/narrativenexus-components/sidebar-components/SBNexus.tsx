// SB stands for Side Bar, this component is UI under the Narrative Nexus tab of the right Side bar.

import SBSearch from "./SBSearch";
import SBNexusEntityList from "./SBNexusEntityList";

export default function SBNexus() {
  return (
    <div className="flex flex-col justify-start w-full mt-primary text-text-secondary">
        <SBSearch />
        <SBNexusEntityList entityType="Character" entities={['Soham', 'Harsh', 'Chinmay', 'Anway']} />
        <SBNexusEntityList entityType="Location" entities={['Soham', 'Harsh', 'Chinmay', 'Anway']} />
        <SBNexusEntityList entityType="Item/Object" entities={['Soham', 'Harsh', 'Chinmay', 'Anway']} />

    </div>
  );
}
