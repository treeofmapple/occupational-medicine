use super::*;

pub fn generate_risco_ocupacional<R: Rng + ?Sized>(
    rng: &mut R,
    file: File,
) -> Result<(), Box<dyn Error>> {
    let mut wtr = Writer::from_writer(file);
    for i in 1..=NUM_RISCOS_OCUPACIONAIS {
        let risk_category = {
            let idx = rng.gen_range(0..RISK_CATEGORIES.len());
            RISK_CATEGORIES[idx].to_string()
        };

        let ro = RiscoOcupacional {
            id_risco_ocupacional: i,
            nome_risco: RISKS[((i - 1) as usize) % RISKS.len()].to_string(),
            descricao: Sentence(5..8).fake::<String>(),
            severity: if rng.gen_bool(0.5) {
                "low".into()
            } else {
                "medium".into()
            },
            preventive_measures: Sentence(3..6).fake::<String>(),
            risk_category,
            exposure_level: if rng.gen_bool(0.2) {
                "high".into()
            } else {
                "low".into()
            },
            status: "active".into(),
        };
        wtr.serialize(&ro)?;
    }
    wtr.flush()?;
    println!(
        "Generated {} risco_ocupacional records.",
        NUM_RISCOS_OCUPACIONAIS
    );
    Ok(())
}
