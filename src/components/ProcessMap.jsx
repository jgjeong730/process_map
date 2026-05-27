import StageCard from './StageCard'

export default function ProcessMap({ stages, activeId, checks, onSelect }) {
  function getProgress(stage) {
    return stage.checklist.filter(item => checks[item.id]).length
  }

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #E2E8F0',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1E293B', marginBottom: '4px' }}>
          전체 프로세스
        </h2>
        <p style={{ fontSize: '13px', color: '#94A3B8' }}>
          단계를 클릭하면 상세 체크리스트를 확인할 수 있습니다
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          overflowX: 'auto',
          paddingBottom: '8px',
        }}
      >
        {stages.map((stage, i) => (
          <StageCard
            key={stage.id}
            stage={stage}
            isActive={activeId === stage.id}
            progress={getProgress(stage)}
            onClick={() => onSelect(stage.id)}
            isLast={i === stages.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
