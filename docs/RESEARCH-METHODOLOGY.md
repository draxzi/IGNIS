# Research methodology

IGNIS starts with source discovery, then records only what the source page or repository entry visibly supports. The current inventory prioritizes NASA Glenn Research Center’s combustion overview, NASA Physical Sciences Informatics investigation records, and public NASA Technical Reports Server metadata. NASA Open Data remains a future source pathway; no unverified combustion dataset is represented as present.

NASA Glenn explains that reduced gravity suppresses buoyancy-driven flow and helps researchers study combustion phenomena that are difficult to isolate on Earth. The same page identifies current and archived investigations including SoFIE, FLARE, FLEX, Saffire, SAME, ACME and the Combustion Integrated Rack. The application uses those descriptions as research context, not as new measurements.

The NASA PSI repository exposes investigation records with objectives and approaches. IGNIS includes ACME CFI-G, ACME / Flame Design and SPICE-related analysis because their entries name documented variables such as fuel, dilution, flow rate, pressure, soot inception and image processing. The application does not embed a PSI flight dataset or infer numerical results from those descriptions.

The NASA NTRS record for document `20020028886` is included as a public metadata record. Its landing page reports a 2001 conference paper acquired from NASA Glenn Research Center and no preview. IGNIS therefore links the record and keeps the limitation visible.

## Attribution rules in the application

The assistant chooses sources by answer branch: spherical diffusion flame answers cite ACME CFI-G; buoyancy explanations cite the NASA Glenn overview; safety answers cite FLEX/Saffire/SAME; dataset answers cite ACME and SPICE-related PSI metadata; unsupported questions receive no generic NASA links. Configured AI receives the matched record context and returns only those matched records as linkable source metadata.

## Source links

- NASA Glenn Research Center, [Combustion Science](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/combustion-science/)
- NASA, [Combustion Science in Reduced Gravity booklet](https://www.nasa.gov/wp-content/uploads/2016/05/np-2015-10-034-jsc_combustion_in_reduced_gravity-iss-mini-book-011116-508.pdf)
- NASA Physical Sciences Informatics, [Research repository](https://psi.nasa.gov/physci/repo)
- NASA Technical Reports Server, [Document 20020028886](https://ntrs.nasa.gov/citations/20020028886)

The source inventory should be refreshed before any public scientific claim. Dates, availability and citation text in the UI are metadata about the linked source, not a substitute for reading it.
