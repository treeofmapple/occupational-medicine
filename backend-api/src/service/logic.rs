use crate::{
    errorhandler::app_error::AppError,
    structs::logic::{
        aso_trend_report::AsoTrendReport, exams_by_month_report::ExamsByMonthReport,
        fitness_trend::FitnessTrend, risco_categoria_report::RiscoCategoriaReport,
    },
};

use super::{Json, PgPool, State};

#[axum::debug_handler]
pub async fn relatorio_risco_categoria(
    State(pool): State<PgPool>,
) -> Result<Json<Vec<RiscoCategoriaReport>>, AppError> {
    let relatorio = sqlx::query_as::<_, RiscoCategoriaReport>(
        r#"
        SELECT
            risk_category AS categoria,
            COUNT(*)::BIGINT AS quantidade,
            (COUNT(*) * 100.0 / SUM(COUNT(*)) OVER ())::FLOAT8 AS porcentagem
        FROM
            risco_ocupacional
        GROUP BY
            risk_category
        ORDER BY
            quantidade DESC;
        "#,
    )
    .fetch_all(&pool)
    .await?;

    Ok(Json(relatorio))
}

#[axum::debug_handler]
pub async fn exames_por_mes(
    State(pool): State<PgPool>,
) -> Result<Json<Vec<ExamsByMonthReport>>, AppError> {
    let rows = sqlx::query!(
        r#"
        SELECT
            TO_CHAR(data_exame, 'Mon') AS month,
            SUM(CASE WHEN type_exam = 'admission' THEN 1 ELSE 0 END)::BIGINT AS admission,
            SUM(CASE WHEN type_exam = 'periodic' THEN 1 ELSE 0 END)::BIGINT AS periodic,
            SUM(CASE WHEN type_exam = 'return_to_work' THEN 1 ELSE 0 END)::BIGINT AS return_to_work,
            SUM(CASE WHEN type_exam = 'dismissal' THEN 1 ELSE 0 END)::BIGINT AS dismissal
        FROM exames
        GROUP BY TO_CHAR(data_exame, 'Mon'), EXTRACT(MONTH FROM data_exame)
        ORDER BY EXTRACT(MONTH FROM data_exame)
        "#
    )
    .fetch_all(&pool)
    .await?;

    let result = rows
        .into_iter()
        .map(|r| ExamsByMonthReport {
            month: r.month.unwrap_or("N/A".into()),
            admission: r.admission.unwrap_or(0),
            periodic: r.periodic.unwrap_or(0),
            return_to_work: r.return_to_work.unwrap_or(0),
            dismissal: r.dismissal.unwrap_or(0),
        })
        .collect();

    Ok(Json(result))
}

#[axum::debug_handler]
pub async fn aso_trend(State(pool): State<PgPool>) -> Result<Json<Vec<AsoTrendReport>>, AppError> {
    let rows = sqlx::query!(
        r#"
        SELECT
            TO_CHAR(data_exame, 'Mon') AS month,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END)::BIGINT AS completed,
            SUM(CASE WHEN status = 'issued' THEN 1 ELSE 0 END)::BIGINT AS issued,
            SUM(CASE WHEN status IN ('scheduled', 'in_progress') THEN 1 ELSE 0 END)::BIGINT AS pending
        FROM exames
        GROUP BY TO_CHAR(data_exame, 'Mon'), EXTRACT(MONTH FROM data_exame)
        ORDER BY EXTRACT(MONTH FROM data_exame)
        "#
    )
    .fetch_all(&pool)
    .await?;

    let result: Vec<AsoTrendReport> = rows
        .into_iter()
        .map(|r| AsoTrendReport {
            month: r.month.unwrap_or_else(|| "N/A".to_string()),
            complete: r.completed.unwrap_or(0),
            issued: r.issued.unwrap_or(0),
            pending: r.pending.unwrap_or(0),
        })
        .collect();

    Ok(Json(result))
}

#[axum::debug_handler]
pub async fn fitness_trend(
    State(pool): State<PgPool>,
) -> Result<Json<Vec<FitnessTrend>>, AppError> {
    let fitness_data = sqlx::query_as::<_, FitnessTrend>(
        r#"
        SELECT
            TO_CHAR(data_exame, 'Mon') AS month,
            SUM(CASE WHEN result = 'fit' THEN 1 ELSE 0 END)::BIGINT AS fit,
            SUM(CASE WHEN result = 'fit_with_restrictions' THEN 1 ELSE 0 END)::BIGINT AS fit_with_restrictions,
            SUM(CASE WHEN result = 'unfit' THEN 1 ELSE 0 END)::BIGINT AS unfit
        FROM
            exames
        WHERE
            result IS NOT NULL
        GROUP BY
            EXTRACT(MONTH FROM data_exame),
            TO_CHAR(data_exame, 'Mon')
        ORDER BY
            EXTRACT(MONTH FROM data_exame)
        LIMIT 12;
        "#,
    )
    .fetch_all(&pool)
    .await?;

    Ok(Json(fitness_data))
}
