package br.dwws.labwork.classiweb.core.persistence;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import br.dwws.labwork.classiweb.core.domain.UsuarioComum;
import br.ufes.inf.nemo.jbutler.ejb.persistence.BaseJPADAO;

/** TODO: generated by FrameWeb. Should be documented. */
@Stateless
public class UsuarioComumDAOJPA extends BaseJPADAO<UsuarioComum> implements UsuarioComumDAO {
  /** Serialization id (using default value, change if necessary). */
  private static final long serialVersionUID = 1L;

  /** TODO: generated by FrameWeb. Should be documented. */
  @PersistenceContext
  private EntityManager entityManager;

  /** TODO: generated by FrameWeb. Should be documented. */
  @Override
  protected EntityManager getEntityManager() {
    return entityManager;
  }



}
